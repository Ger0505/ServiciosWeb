import React, { useState, useEffect } from "react"
import { CBadge, CButton, CCollapse, CDataTable, CCol, CRow } from "@coreui/react"
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
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ]

  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "secondary"
      case "Pending":
        return "warning"
      case "Banned":
        return "danger"
      default:
        return "primary"
    }
  }

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
        status: (item) => (
          <td>
            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
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
              {/* <CCardBody>
                <h4>ID. {item._id}</h4>
                <p className=""><strong>Usuario:</strong> {item.usuario.nombre + " " + item.usuario.apellidos}</p>
                <p className=""><strong>Cantidad:</strong> {item.cantidad}</p>
                <p className=""><strong>Precio: </strong>{item.precio}</p>
                <p className=""><strong>Descripción:</strong> {item.descripcion}</p>
                <p className=""> <strong>Dirección:</strong> {item.usuario.direccion}</p>
                <p className=""> <strong>Repartidor:</strong> {_searchRepartidor(item.repartidor?._id)} </p>
                <CDropdown>
                  <CDropdownToggle color="primary">Cambiar Repartidor</CDropdownToggle>
                  <CDropdownMenu>
                    {arrayRep.map((rep) => {
                      return (
                        <CDropdownItem onClick={() => _changeRepartidor(item._id,rep._id)} component="button">{`${rep.usuario.nombre} ${rep.usuario.apellidos}`}</CDropdownItem>
                      )
                    })}
                  </CDropdownMenu>
                </CDropdown>
                <CButton size="sm" color="info">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" className="ml-1">
                  Delete
                </CButton>
              </CCardBody> */}
            </CCollapse>
          )
        },
      }}
    />
    </>
  )
}

export default Pedidos
