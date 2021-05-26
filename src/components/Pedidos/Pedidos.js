import React, { useState, useEffect } from "react"
import { CButton, CCollapse, CDataTable, CCol, CRow } from "@coreui/react"
import { API, Session } from "../../helpers"
import Detalle from "../Detalle"

const Pedidos = () => {
  const [details, setDetails] = useState([])
  const [arrayJSON, setArrayJSON] = useState([])
  const [arrayRep, setArrayRep] = useState([])

  useEffect(() => {
    const getData = async () => {
      let s = Session.getSession()
      const pedidos = await API.getData( "ped/emp/" + s._id, "GET" )
      setArrayJSON(pedidos)
      const reps = await API.getData( "rep/" + s._id, "GET")
      setArrayRep(reps)
    }
    getData()
  }, [])

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const _changeRepartidor = async (idPed, idRep) =>{
    let params = {idPed: idPed, idRep: idRep}
    let res = await API.getBody("ped/insert/rep", "POST", params)
    if(res.hasOwnProperty("status")) console.log(res.status)
    else _reset()
  }

  const _reset = async () =>{
    let s = Session.getSession()
    const pedidos = await API.getData( "ped/emp/" + s._id, "GET" )
    setArrayJSON(pedidos)
  }

  const _searchRepartidor = id =>{
    if(!id) return "No definido"
    let usuario = "No definido"
    arrayRep.forEach(req =>{
      if(req._id === id) usuario = req.usuario.nombre + " " + req.usuario.apellidos
    })
    return usuario
  }

  const fields = [
    { key: "_id", label: "ID", _style: { width: "20%" } },
    { key: "usuario", label: "Usuario", _style: { width: "20%" } },
    { key: "fecha", label: "Fecha", _style: { width: "10%" } },
    { key: "hora", label: "Hora", _style: { width: "10%" } },
    { key: "tipo", _style: { width: "10%" } },
    { key: "repartidor", label: "", _style: { width: "3%" },sorter: false, filter: false, },
    {
      key: "show_details",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ]

  return (
    <>
    <CRow>
      <CCol>
      <h3>Lista de Pedidos</h3>
      </CCol>
    </CRow>
    <CDataTable
      items={arrayJSON}
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
        usuario: (item) => (
          <td>{`${item.usuario.nombre} ${item.usuario.apellidos}`}</td>
        ),
        repartidor: (item) => (
          <td>
            {
              item.repartidor ? <i class="fas fa-star" style={{color: ' #fcc300 '}}></i>: null
            }
          </td>
        ),
        show_details: (item, index) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => {
                  toggleDetails(index)
                }}
              >
                {details.includes(index) ? "Ocultar" : "Mostrar"}
              </CButton>
            </td>
          )
        },
        details: (item, index) => {
          return (
            <CCollapse show={details.includes(index)}>
              <Detalle 
                item={item}
                arrayRep={arrayRep}
                onChange={(idPed, idRep) => _changeRepartidor(idPed, idRep)}
                onSearch={(id) => _searchRepartidor(id)}
                reset = {() => _reset()}/>
            </CCollapse>
          )
        },
      }}
    />
    </>
  )
}

export default Pedidos
