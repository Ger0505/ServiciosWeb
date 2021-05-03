import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CFade, CButton, CCollapse, CCardBody, CForm, CLabel, CInputGroup, 
CInputGroupPrepend, CInput, CInputGroupText, CFormGroup, CFormText } from '@coreui/react'
import { useForm, Controller } from "react-hook-form"
import { API, Session } from "../../helpers"
import { useHistory } from "react-router-dom"

const FormRepartidor = ({onRefresh, onReset, updated}) => {
    const [collapsed, setCollapsed] = useState(true)
    const [showElements, setShowElements] = useState(true)
    const { control, handleSubmit, formState: { errors }, reset } = useForm()
    const history = useHistory()

    useEffect(() =>{
        if(updated){
            reset({
                nombre: updated.usuario.nombre,
                apellidos: updated.usuario.apellidos,
                telefono: updated.usuario.telefono,
                direccion: updated.usuario.direccion,
                correo: updated.usuario.correo
            })
        }else{
            reset({nombre: '', apellidos: '', telefono: '', direccion: '', correo:''})
        }
    },[updated, reset])

    const _onSubmit = async data =>{
        let s = await Session.getSession()
        if(!s) history.push("Login")
        data.telefono = parseInt(data.telefono)
        let res = null
        if(updated){
            data._id = updated._id
            res = await API.getBody("rep/update", "PUT", data)
        }else{
            data.empresa = s._id
            res = await API.getBody("rep/insert", "POST", data)
        }
        if(res.hasOwnProperty("status")) console.log(res.msg)
        else{
          if(!updated){
              reset({
                  nombre: '', apellidos: '', telefono: '', direccion: '', correo: ''
              })
              alert("Repartidor insertado correctamente")
          }else alert("Repartidor actualizado")
          onRefresh()
          onReset()
        }
      }

    return (
        <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard style={{marginTop: 10}}>
                <CCardHeader color={updated ? "info": "success"} textColor="white">
                    <strong>{updated  ? 'Actualizando ' + updated._id: 'Agregar Repartidor'}</strong>
                    <div className="card-header-actions">
                        <CButton
                            color="link"
                            className="card-header-action btn-minimize"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <i style={{color: "#fff"}} class={collapsed ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i>
                        </CButton>
                        <CButton
                            color="link"
                            className="card-header-action btn-close"
                            onClick={() => {if(updated) onReset();setShowElements(false)}}
                        >
                            <i style={{color: "#fff"}} class="fas fa-times"></i>
                        </CButton>
                    </div>
                </CCardHeader>
                <CCollapse show={collapsed} timeout={1000}>
                    <CCardBody>
                        <CForm className="form-horizontal" onSubmit={handleSubmit(_onSubmit)}>
                            <CFormGroup>
                                <CLabel htmlFor="nombre">Nombre</CLabel>
                                <div className="controls">
                                    <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText><i class="fas fa-user"></i></CInputGroupText>
                                        </CInputGroupPrepend>
                                        <Controller
                                            name="nombre"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) =>
                                                <CInput {...field} id="nombre" name="nombre" type="text"/>
                                            }
                                            rules={{
                                                required: { value: true, message: 'El nombre es requerido' },
                                                pattern: { value: /^[a-záéíúóñA-ZÁÉÍÓÚÑ '.-]*$/, message: 'Formato de nombre inválido' }
                                            }}
                                        />
                                    </CInputGroup>
                                    {errors.nombre && <CFormText className="help-block" color="danger">{errors.nombre?.message}</CFormText>}
                                </div>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="apellidos">Apellidos</CLabel>
                                <div className="controls">
                                    <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText><i class="fas fa-user-friends"></i></CInputGroupText>
                                        </CInputGroupPrepend>
                                        <Controller
                                            name="apellidos"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) =>
                                                <CInput {...field} id="apellidos" name="apellidos" type="text"/>
                                            }
                                            rules={{
                                                required: { value: true, message: 'Los apellidos son requeridos' },
                                                pattern: { value: /^[a-záéíúóñA-ZÁÉÍÓÚÑ '.-]*$/, message: 'Formato de apellidos inválido' }
                                            }}
                                        />
                                    </CInputGroup>
                                    {errors.apellidos && <CFormText className="help-block" color="danger">{errors.apellidos?.message}</CFormText>}
                                </div>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="telefono">Teléfono</CLabel>
                                <div className="controls">
                                    <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText><i class="fas fa-mobile-alt"></i></CInputGroupText>
                                        </CInputGroupPrepend>
                                        <Controller
                                            name="telefono"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) =>
                                                <CInput {...field} id="telefono" name="telefono" type="tel"/>
                                            }
                                            rules={{
                                                required: { value: true, message: 'El teléfono es requerido' },
                                                pattern: { value: /[0-9]{10}/, message: 'Longtud de 10 dígitos' }
                                            }}
                                        />
                                    </CInputGroup>
                                    {errors.telefono && <CFormText className="help-block" color="danger">{errors.telefono?.message}</CFormText>}
                                </div>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="direccion">Dirección</CLabel>
                                <div className="controls">
                                    <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText><i class="fas fa-map-marked-alt"></i></CInputGroupText>
                                        </CInputGroupPrepend>
                                        <Controller
                                            name="direccion"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) =>
                                                <CInput {...field} id="direccion" name="direccion" type="text"/>
                                            }
                                            rules={{ required: { value: true, message: 'La dirección es requerida' } }}
                                        />
                                    </CInputGroup>
                                    {errors.direccion && <CFormText className="help-block" color="danger">{errors.direccion?.message}</CFormText>}
                                </div>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="correo">Correo Electrónico</CLabel>
                                <div className="controls">
                                    <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                            <CInputGroupText><i class="fas fa-at"></i></CInputGroupText>
                                        </CInputGroupPrepend>
                                        <Controller
                                            name="correo"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) =>
                                                <CInput {...field} id="correo" name="correo" type="email"/>
                                            }
                                            rules={{
                                                required: { value: true, message: 'El correo es requerido' },
                                                pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/, message: 'Formato de correo incorrecto' }
                                            }}
                                        />
                                    </CInputGroup>
                                    {errors.correo && <CFormText className="help-block" color="danger">{errors.correo?.message}</CFormText>}
                                </div>
                            </CFormGroup>
                            <div className="form-actions">
                                <CButton type="submit" color="primary">
                                    {updated ? 'Actualizar Repartidor':'Agregar Repartidor'}
                                </CButton>
                            </div>
                        </CForm>
                    </CCardBody>
                </CCollapse>
            </CCard>
        </CFade>
    )
}

export default FormRepartidor