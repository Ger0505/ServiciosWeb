import React, { useState, useEffect } from 'react'
import { CBadge, CButton, CCardBody, CCollapse, CDataTable } from "@coreui/react"
import { API, Session } from "../../helpers";

const Pedidos = () => {
  const usersData = [
    { id: 0, registrado: '2018/01/01', hora:'12:00 p.m.', tipo: 'Guest', usuario: 'John Doe', status: 'Pending' },
    { id: 1, registrado: '2018/01/01', hora:'12:00 p.m.', tipo: 'Member', usuario: 'Samppa Nori', status: 'Active' },
    { id: 2, registrado: '2018/02/01', hora:'12:00 p.m.', tipo: 'Staff', usuario: 'Estavan Lykos', status: 'Banned' },
    { id: 3, registrado: '2018/02/01', hora:'12:00 p.m.', tipo: 'Admin', usuario: 'Chetan Mohamed', status: 'Inactive' },
    { id: 4, registrado: '2018/03/01', hora:'12:00 p.m.', tipo: 'Member', usuario: 'Derick Maximinus', status: 'Pending' },
    { id: 5, registrado: '2018/01/21', hora:'12:00 p.m.', tipo: 'Staff', usuario: 'Friderik Dávid', status: 'Active' },
    { id: 6, registrado: '2018/01/01', hora:'12:00 p.m.', tipo: 'Member', usuario: 'Yiorgos Avraamu', status: 'Active' },
    { id: 7, registrado: '2018/02/01', hora:'12:00 p.m.', tipo: 'Staff', usuario: 'Avram Tarasios', status: 'Banned' },
    { id: 8, registrado: '2018/02/01', hora:'12:00 p.m.', tipo: 'Admin', usuario: 'Quintin Ed', status: 'Inactive' },
    { id: 9, registrado: '2018/03/01', hora:'12:00 p.m.', tipo: 'Member', usuario: 'Enéas Kwadwo', status: 'Pending' },
    { id: 10, registrado: '2018/01/21', hora:'12:00 p.m.', tipo: 'Staff', usuario: 'Agapetus Tadeáš', status: 'Active' },
    { id: 11, registrado: '2018/01/01', hora:'12:00 p.m.', tipo: 'Member', usuario: 'Carwyn Fachtna', status: 'Active' },
    { id: 12, registrado: '2018/02/01', hora:'12:00 p.m.', tipo: 'Staff', usuario: 'Nehemiah Tatius', status: 'Banned' },
    { id: 13, registrado: '2018/02/01', hora:'12:00 p.m.', tipo: 'Admin', usuario: 'Ebbe Gemariah', status: 'Inactive' },
    { id: 14, registrado: '2018/03/01', hora:'12:00 p.m.', tipo: 'Member', usuario: 'Eustorgios Amulius', status: 'Pending' },
    { id: 15, registrado: '2018/01/21', hora:'12:00 p.m.', tipo: 'Staff', usuario: 'Leopold Gáspár', status: 'Active' },
    { id: 16, registrado: '2018/01/01', hora:'12:00 p.m.', tipo: 'Member', usuario: 'Pompeius René', status: 'Active' },
    { id: 17, registrado: '2018/02/01', hora:'12:00 p.m.', tipo: 'Staff', usuario: 'Paĉjo Jadon', status: 'Banned' },
    { id: 18, registrado: '2018/02/01', hora:'12:00 p.m.', tipo: 'Admin', usuario: 'Micheal Mercurius', status: 'Inactive' },
    { id: 19, registrado: '2018/03/01', hora:'12:00 p.m.', tipo: 'Member', usuario: 'Ganesha Dubhghall', status: 'Pending' },
    { id: 20, registrado: '2018/01/21', hora:'12:00 p.m.', tipo: 'Staff', usuario: 'Hiroto Šimun', status: 'Active' },
    { id: 21, registrado: '2018/01/01', hora:'12:00 p.m.', tipo: 'Member', usuario: 'Vishnu Serghei', status: 'Active' },
    { id: 22, registrado: '2018/02/01', hora:'12:00 p.m.', tipo: 'Staff', usuario: 'Zbyněk Phoibos', status: 'Banned' },
    { id: 23, registrado: '2018/01/01', hora:'12:00 p.m.', tipo: 'Member', usuario: 'Aulus Agmundr', status: 'Pending' },
    { id: 42, registrado: '2001/05/25', hora:'12:00 p.m.', tipo: 'Alien', usuario: 'Ford Prefect', status: 'Don\'t panic!' }
  ]

  const [details, setDetails] = useState([])
  
  // useEffect(() =>{
  //   const getPedidos = async () =>{
  //     let _id = Session.getSession()._id
  //     if(session){
  //       let res = API.getData("ped/" + _id, "GET")

  //     }
  //   }

  //   getPedidos()
  // },[])

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


  const fields = [
    { key: 'id', _style: { width: '10%' } },
    { key: 'registrado', _style: { width: '10%' } },
    { key: 'hora', _style: { width: '10%' } },
    { key: 'tipo', _style: { width: '20%' } },
    { key: 'usuario', _style: { width: '40%' } },
    'status',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  return (
    <CDataTable
      items={usersData}
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
        'status':
          (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>
                {item.status}
              </CBadge>
            </td>
          ),
        'show_details':
          (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => { toggleDetails(index) }}
                >
                  {details.includes(index) ? 'Ocultar' : 'Mostrar'}
                </CButton>
              </td>
            )
          },
        'details':
          (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h4>
                    {item.usuario}
                  </h4>
                  <p className="text-muted">User since: {item.registrado}</p>
                  <CButton size="sm" color="info">
                    User Settings
                      </CButton>
                  <CButton size="sm" color="danger" className="ml-1">
                    Delete
                      </CButton>
                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />
  )
}

export default Pedidos;