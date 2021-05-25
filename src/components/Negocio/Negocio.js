import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CForm, CInput, CLabel, CRow,
CTextarea, CButton, CCardFooter, CFormText} from "@coreui/react";
import CIcon from '@coreui/icons-react';
import { useForm, Controller } from "react-hook-form"
import { useHistory } from "react-router-dom";
import { API, Session } from "../../helpers";
import FileUpload from '../FileUpload'

const Negocio = () => {
  const [emp, setEmp] = useState({_id:'', nombre:'', descripcion:'', correo:'', direccion:'',telefono:''});
  const [pwdMsg, setPwdMsg] = useState('');
  const [correoDelete, setCorreoDelete] = useState('');
  const [logoSrc, setLogoSrc] = useState('');
  const { control, handleSubmit, formState: { errors }, reset } = useForm({defaultValues: emp,  mode: 'onBlur' })
  const { control: control2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset:reset2 } = 
  useForm({ mode: 'onBlur' })
  const history = useHistory()

  useEffect(() => {

    const getEmpresa = async () => {
      let s = Session.getSession()
      if (!s) history.push("/login")
      let res = await API.getData("emp/" + s._id, "GET")
      res.telefono = res.telefono + ""
      setEmp({
          _id: s._id,
          nombre: res.nombre,
          descripcion: res.descripcion,
          correo: res.correo,
          direccion: res.direccion,
          telefono: res.telefono
      })
      reset(res)
      setLogoSrc(res.logo)
    }
    getEmpresa()
  }, [history, reset])

  const _actualizar = async data => {
    data.telefono = parseInt(data.telefono)
    let res = await API.getBody("emp/update", "PUT", data)
    if(res.hasOwnProperty("status")) console.log(res);
    else alert("Información actualizada")
    _actualizarSession()
  }

  const _actualizarLogo = async name =>{
    let res = await API.getBody("emp/update/logo", "PUT", {_id: emp._id, name: name})
    if(!res.hasOwnProperty("status")){
      alert("Imagen de logo cambiada, actualice página para visualizar cambios")
    }else{
      alert("Error al actualizar")
      _actualizarSession()
    }
  }

  const _cambiarPwd = async data => {
    if(data.nuevo !== data.re) setPwdMsg('La confirmación no concuerda')
    else{
      data._id = emp._id
      let res = await API.getBody("emp/resetPwd", "PUT", data)
      if (res.hasOwnProperty("status")) setPwdMsg(res.msg)
      else {
        setPwdMsg('')
        reset2({actual: '', nuevo:'', re:''})
        alert("Contraseña actualizada")
      }

    }
  }

  const _eliminarCuenta = async e => {
    let s = Session.getSession()
    if (!s) return
    if (s.correo === correoDelete) {
      let res = await API.getData("emp/delete/" + s._id, "DELETE")
      if (res.code === 200) {
        Session.removeSession()
        history.push("/login")
      }
    }
  }

  const _actualizarSession = async () =>{
    let s = Session.getSession()
    let res = await API.getData("emp/" + s._id)
    res.telefono = res.telefono + ""
    setEmp({
        _id: s._id,
        nombre: res.nombre,
        descripcion: res.descripcion,
        correo: res.correo,
        direccion: res.direccion,
        telefono: res.telefono
    })
    reset(res)
    setLogoSrc(res.logo)
  }


  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CForm onSubmit={handleSubmit(_actualizar)} className="form-horizontal">
              <CCardHeader>
                <strong>Información Principal de la empresa</strong>
              </CCardHeader>
              <CCardBody>
                <CFormGroup>
                  <CLabel htmlFor="nombre">Empresa</CLabel>
                <Controller
                  name="nombre"
                  control={control}
                  defaultValue={emp.nombre}
                  render={({ field }) => 
                  <CInput {...field} id="nombre" name="nombre" placeholder="Ingrese nombre de la empresa"
                  />}
                  rules={{ required: {value: true, message: 'El nombre es requerido'},
                  pattern: {value: /^[a-záéíúóñA-ZÁÉÍÓÚÑ '.-]*$/, message: 'Formato de nombre inválido'}}}
                />
                { errors.nombre && <CFormText className="help-block">{errors.nombre?.message}</CFormText>}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="descripcion">Descripción</CLabel>
                  <Controller
                  name="descripcion"
                  control={control}
                  defaultValue={emp.descripcion}
                  render={({ field }) => 
                    <CTextarea
                    {...field}
                    name="descripcion"
                    id="descripcion"
                    rows="5"
                    placeholder="Ingrese descripción de la empresa"
                    />}
                  rules={{ required: {value: true, message: 'La descripción es requerida'}}}
                  />
                  { errors.descripcion && <CFormText className="help-block">{errors.descripcion?.message}</CFormText>}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="correo">Correo Electrónico</CLabel>
                  <Controller
                  name="correo"
                  control={control}
                  defaultValue={emp.correo}
                  render={({ field }) => 
                    <CInput {...field} type="email" id="correo" name="correo"
                    placeholder="Ingrese correo electrónico"
                    autoComplete="email"
                  />}
                  rules={{ required: { value: true, message: 'El correo es requerido' },
                  pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/, message: 'Formato de correo incorrecto' }}}
                  />
                  { errors.correo && <CFormText className="help-block">{errors.correo?.message}</CFormText>}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="direccion">Dirección</CLabel>
                  <Controller
                  name="direccion"
                  control={control}
                  defaultValue={emp.direccion}
                  render={({ field }) => 
                  <CInput {...field} id="direccion" name="direccion" placeholder="Ingrese Dirección"/>}
                  rules={{ required: { value: true, message: 'La dirección es requerida' }}}
                  />
                  { errors.direccion && <CFormText className="help-block">{errors.direccion?.message}</CFormText>}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="telefono">Telefóno</CLabel>
                  <Controller
                  name="telefono"
                  control={control}
                  defaultValue={emp.telefono}
                  render={({ field }) => 
                    <CInput {...field} type="text" id="telefono" name="telefono" placeholder="Ingrese teléfono"/>}
                  rules={{ required: {value: true, message: 'El teléfono es requerido'},
                  pattern:{ value: /[0-9]{10}/, message: 'Longtud de 10 dígitos' }}}
                  />
                  { errors.telefono && <CFormText className="help-block">{errors.telefono?.message}</CFormText>}
                </CFormGroup>
                {/* <CFormGroup >
                  <CLabel htmlFor="dias">Días</CLabel>
                  <CInput type="text" id="dias" name="dias" placeholder="Día a Día" />
                </CFormGroup>
                <CFormGroup >
                  <CLabel htmlFor="horario">Horario de entrada y salida</CLabel>
                  <CInput type="text" id="horario" name="horario" placeholder="hh:mm a hh:mm" />
                </CFormGroup> */}
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Actualizar</CButton>
              </CCardFooter>
            </CForm>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <FileUpload actualLogo={logoSrc} cb={_actualizarLogo}/>
          <CCard>
            <CForm onSubmit={handleSubmit2(_cambiarPwd)}>
              <CCardHeader>
                <strong>Cambiar Contraseña</strong>
              </CCardHeader>
              <CCardBody>
                {pwdMsg!=='' && <span style={{ color: 'red' }}>{pwdMsg}</span>}
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Contraseña Actual</CLabel>
                  <Controller
                  name="actual"
                  control={control2}
                  defaultValue=""
                  render={({ field }) => <CInput {...field} type="password" id="actual" name="actual"/>}
                  rules={{ required: { value: true, message: 'La contraseña es requerida' }, 
                  minLength: { value: 8, message: 'Tener al menos 8 carácteres' } }}
                  />
                  { errors2.actual && <CFormText className="help-block">{errors2.actual?.message}</CFormText>}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nuevo">Nueva Contraseña</CLabel>
                  <Controller
                  name="nuevo"
                  control={control2}
                  defaultValue=""
                  render={({ field }) => <CInput {...field} type="password" id="nuevo" name="nuevo" autoComplete="current-password"/>}
                  rules={{ required: { value: true, message: 'La contraseña es requerida' }, 
                  minLength: { value: 8, message: 'Tener al menos 8 carácteres' } }}
                  />
                  { errors2.nuevo && <CFormText className="help-block">{errors2.nuevo?.message}</CFormText>}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="re">Confirmación de Nueva Contraseña</CLabel>
                  <Controller
                  name="re"
                  control={control2}
                  defaultValue=""
                  render={({ field }) => <CInput {...field} type="password" id="re" name="re" autoComplete="current-password"/>}
                  rules={{ required: { value: true, message: 'La confirmación es requerida' }}}
                  />
                  { errors2.re && <CFormText className="help-block">{errors2.re?.message}</CFormText>}
                </CFormGroup>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Cambiar contraseña</CButton>
              </CCardFooter>
            </CForm>
          </CCard>
          <CCard color="danger" className="text-white">
            <CForm onSubmit={_eliminarCuenta}>
              <CCardHeader>
                <strong>BORRAR CUENTA</strong>
              </CCardHeader>
              <CCardBody>
                ¿Estás seguro de eliminar tu cuenta? Todos tus datos que han recopilado se elimarán.
                Para saber que esta decisión sea de manera consciente, ingrese su contraseña.
              <br />
                <CFormGroup>
                  <CInput type="email" id="correoDelete" name="correoDelete"
                    value={correoDelete}
                    onChange={e => setCorreoDelete(e.target.value)} />
                </CFormGroup>
              </CCardBody>
              <CCardFooter color="danger" className="text-white">
                <CButton type="submit" size="sm" color="warning" style={{ color: 'black' }}><CIcon name="cil-scrubber" /> Borrar Cuenta</CButton>
              </CCardFooter>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Negocio;