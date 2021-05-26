import { CCardBody, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CButton, CInput, CFormText, CCol, CRow } from '@coreui/react';
import React, { useState, useEffect } from 'react'
import { API } from "../../helpers"

const Detalle = ({ item, arrayRep, onSearch, onChange, reset }) => {
  const [msgError, setMsgError] = useState('')
  const [cantidad, setCantidad] = useState(item.cantidad)
  const [precio, setPrecio] = useState(item.precio)
  const [costoDefault, setCostoDefault] = useState(0);
  useEffect(()=>{
    if(item.tipo === 'Garrafón') setCostoDefault(10)
    else if(item.tipo === 'Estacionario') setCostoDefault(10)
    else if(item.tipo === 'Tanque'){
      if(item.descripcion === '10 Litros') setCostoDefault(10)
      else if(item.descripcion === '20 Litros') setCostoDefault(20)
      else if(item.descripcion === '30 Litros') setCostoDefault(30)
      else if(item.descripcion === '40 Litros') setCostoDefault(40)
      else if(item.descripcion === '50 Litros') setCostoDefault(50)
    }
    
  },[item])

  const _onSubmit = async e => {
    e.preventDefault()
    let c, p = -100
    try {
      c = parseFloat(cantidad)
      p = parseFloat(precio)
      console.log(c + " " + p);
    } catch (e) {
      setMsgError('Formato de cantidad y/o precio inválida')
    }
    if (c > 0 && p > 0) {
      let res = await API.getBody("ped/update", "PUT", { _id: item._id, cantidad: c, precio: p })
      if (res.hasOwnProperty("status")) console.log(res.msg)
      setMsgError("")
    } else {
      setMsgError("Número mayor a 0 en cantidad y/o precio")
    }
    reset()
  }

  const _handlePrecio = e =>{
    try {
      if(e.target.value === '') setPrecio(0)
      else setPrecio(parseInt(e.target.value)* costoDefault)
    } catch (err) {
      setPrecio(0)
    }
  }

  const _eliminarPedido = async () =>{
    let res = await API.getData("ped/delete/" + item._id, "DELETE")
    if(res.code === 200) reset()
    else alert("Error al eliminar pedido")
  }

  return (
    <CCardBody>
      <CForm onSubmit={_onSubmit}>
      <div style={{display: 'flex', flexDirection: 'row-reverse', float: 'right'}}>
      <CButton onClick={() => _eliminarPedido()}
      color="danger" shape="btn-pill" style={{marginRight: 8}}>
        <i class="fas fa-trash-alt"></i> Eliminar Pedido
      </CButton>
      </div>
        <h4>ID. {item._id}</h4>
        <p className=""><strong>Usuario:</strong> {item.usuario.nombre + " " + item.usuario.apellidos}</p>
        <p className=""> <strong>Dirección:</strong> {item.usuario.direccion}</p>
        <p className=""> <strong>Repartidor:</strong> {onSearch(item.repartidor?._id)} </p>
        <p className=""><strong>Descripción:</strong> {item.descripcion}</p>
        <CRow>
          <CCol xs="6">
            <p className=""><strong>Cantidad:</strong></p>
            <CInput id="cantidad" name="cantidad" type="text" required 
              value={cantidad}
              onChange={e => { setMsgError(''); setCantidad(e.target.value);  _handlePrecio(e)}} />
          </CCol>
          <CCol xs="6">
            <p className=""><strong>Precio: </strong></p>
            <CInput id="precio" name="cantidad" type="text" required 
              value={precio}
              onChange={e => { setMsgError(''); setPrecio(e.target.value) }} />
          </CCol>
        </CRow>
        <br />
        {msgError !== '' && <CFormText style={{ marginTop: '-1rem' }} className="help-block" color="danger">{msgError}</CFormText>}
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
        <br/>
        <CButton type="submit" color="info">
          Actualizar
        </CButton>
      </CForm>
    </CCardBody>
  )
}

export default Detalle;