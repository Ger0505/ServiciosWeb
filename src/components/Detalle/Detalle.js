import { CCardBody, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CButton, CInput, CFormText, CCol, CRow } from '@coreui/react';
import React, { useState } from 'react'
import { API } from "../../helpers"

const Detalle = ({ item, arrayRep, onSearch, onChange, reset }) => {
  const [msgError, setMsgError] = useState('')
  const [cantidad, setCantidad] = useState(item.cantidad)
  const [precio, setPrecio] = useState(item.precio)

  const _onSubmit = async e => {
    e.preventDefault()
    let c, p = -100
    try {
      c = parseFloat(cantidad)
      p = parseFloat(precio)
      console.log(c+ " " + p);
    } catch (e) {
      setMsgError('Formato de cantidad y/o precio inválida')
    }
    if(c > 0 && p > 0){
      let res = await API.getBody("ped/update", "PUT", { _id: item._id, cantidad: c, precio: p })
      if (res.hasOwnProperty("status")) console.log(res.msg)
      setMsgError("")
    }else{
      setMsgError("Número mayor a 0 en cantidad y/o precio")
    }
    reset()
  }

  return (
    <CCardBody>
      <CForm onSubmit={_onSubmit}>
        <h4>ID. {item._id}</h4>
        <p className=""><strong>Usuario:</strong> {item.usuario.nombre + " " + item.usuario.apellidos}</p>
        <p className=""> <strong>Dirección:</strong> {item.usuario.direccion}</p>
        <p className=""> <strong>Repartidor:</strong> {onSearch(item.repartidor?._id)} </p>
        <p className=""><strong>Descripción:</strong> {item.descripcion}</p>
        <CRow>
          <CCol xs="6">
          <p className=""><strong>Cantidad:</strong></p>
        <CInput id="cantidad" name="cantidad" type="text" required value={cantidad} onChange={e => { setMsgError(''); setCantidad(e.target.value) }} />
          </CCol>
          <CCol xs="6">
          <p className=""><strong>Precio: </strong></p>
        <CInput id="precio" name="cantidad" type="text" required value={precio} onChange={e => { setMsgError(''); setPrecio(e.target.value) }} />
          </CCol>
        </CRow>
       <br />
        {msgError !== '' && <CFormText style={{marginTop: '-1rem'}} className="help-block" color="danger">{msgError}</CFormText>}
        <CDropdown>
          <CDropdownToggle color="primary">Cambiar Repartidor</CDropdownToggle>
          <CDropdownMenu>
            {arrayRep.map((rep) => {
              return (
                <CDropdownItem onClick={() => onChange(item._id, rep._id)} component="button">{`${rep.usuario.nombre} ${rep.usuario.apellidos}`}</CDropdownItem>
              )
            })}
          </CDropdownMenu>
        </CDropdown>
        <CButton type="submit" color="info">
          Actualizar
        </CButton>
      </CForm>
    </CCardBody>
  )
}

export default Detalle;