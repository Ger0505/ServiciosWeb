import React, { useState, useEffect} from 'react'
import { CCol, CContainer, CDataTable, CRow, CButton } from '@coreui/react'
import { useHistory } from "react-router-dom"
import { API, Session } from "../../helpers"
import FormRepartidor from "../FormRepartidor"

const Repartidor = () => {
    const [lista, setLista] = useState([])
    const history = useHistory()
    const [updated, setUpdated] = useState()

    useEffect(() =>{
      const getRepart = async () =>{
        let s = await Session.getSession()
        if(s){
          let res = await API.getData("rep/" + s._id, "GET")
          setLista(res)
        }
      }
      getRepart()
    },[])

    const _eliminarRepart = async id =>{
      let res = await API.getData("rep/delete/" + id, "DELETE")
      if(res.hasOwnProperty("status")) console.log(res.msg)
      else{
        refreshTabla()
        alert("Repartidor Eliminado")
      }
    }

    const refreshTabla =  async () =>{
      let s = await Session.getSession()
        if(!s) history.push("Login")
        let res = await API.getData("rep/" + s._id, "GET")
        setLista(res)
    }
    
    const fields = [
        { key: 'ID', _style: { width: '10%' } },
        { key: 'nombre', _style: { width: '20%' } },
        { key: 'apellidos', _style: { width: '20%' } },
        { key: 'telefono',label: 'Teléfono', _style: { width: '20%' } },
        { key: 'correo', _style: { width: '20%' } },
        { key: 'accion',label: 'Acciones', _style: { width: '10%' }, sorter: false, filter: false }
    ]

    return (
      <CContainer>
        <CRow>
      <CCol>
      <h3>Lista de Repartidores</h3>
      </CCol>
    </CRow>
      <CRow>
        <CCol xs="12">
          <CDataTable
              items={lista}
              fields={fields} 
              columnFilter
              tableFilter
              footer
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              scopedSlots={{
                "ID": (item) => ( <td>{item._id}</td> ),
                "nombre": (item) => ( <td>{item.usuario.nombre}</td> ),
                "apellidos": (item) => ( <td>{item.usuario.apellidos}</td> ),
                "telefono": (item) => ( <td>{item.usuario.telefono}</td> ),
                "correo": (item) => ( <td>{item.usuario.correo}</td> ),
                "direccion": (item) => ( <td>{item.usuario.direccion}</td> ),
                "accion": (item) => ( 
                  <td style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CButton onClick={() => _eliminarRepart(item._id)}
                    color="danger" shape="btn-pill" style={{marginRight: 8}}>
                      <i class="fas fa-trash-alt"></i>
                    </CButton>
                    <CButton color="info" shape="btn-pill" onClick={() => {setUpdated(item)}}>
                    <i class="fas fa-pencil-alt"></i>
                    </CButton>
                  </td>
                )
              }}
          />
          </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          {
            updated ? 
            <FormRepartidor 
            onRefresh={() => refreshTabla()} 
            onReset={() => setUpdated(null)}  
            updated={updated}/>: null
          }
          <FormRepartidor 
            onRefresh={() => refreshTabla()} 
            onReset={() => setUpdated(null)}  
            updated={null}
          />
        </CCol>
      </CRow>
      </CContainer>
    )
}

export default Repartidor