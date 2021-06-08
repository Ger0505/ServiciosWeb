import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import WidgetsDropdown from './WidgetsDropdown'
import { API, Session } from "../../helpers";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [reps, setReps] = useState([]);

  useEffect(() =>{
    const getData = async () =>{
      let s = Session.getSession()
      if(!s) return 
      let res = await API.getData("ped/gb/" + s._id, "GET")
      if(res) setData(res)
      res = await API.getData("ped/gb/v/" + s._id, "GET")
      if(res) setVentas(res)
      res = await API.getData("rep/" + s._id, "GET")
      if(res) setReps(res)
    }
    getData()
  },[])

  const _getAttribute = (atr,dataset,num) =>{
    let array = []
    if(atr === "_id" && num === 1 ){
      dataset.forEach(item => {
        array.push(_getNombreRep(item[atr]))
      })
    }else{
      dataset.forEach(item => array.push(item[atr]))
    }
    return array
  }

  const _getNombreRep = id =>{
    let name = 'Sin asignar'
    reps.forEach(item =>{
      if(id === item._id){ name = item.usuario.nombre + " " + item.usuario.apellidos }
    })
    return name
  }

  return (
    <>
    <WidgetsDropdown/>
    <CRow>
      <CCol>
      <h3>Estadísticas generales</h3>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
      <CCard>
        <CCardHeader>
          <strong>PEDIDOS POR REPARTIDOR</strong>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: 'No. de pedidos',
                backgroundColor: '#f87979',
                data: _getAttribute("pedidos", data,0)
              }
            ]}
            labels={_getAttribute("_id",data,1)}
            options={{
              tooltips: {
                enabled: true
              },
              scales:{
                yAxes:[{
                  ticks: {
                      beginAtZero: true
                  }
              }]
              }
            }}
          />
        </CCardBody>
      </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <strong>VENTAS DIARIAS</strong>
          </CCardHeader>
          <CCardBody>
          <CChartLine
            datasets={[
              {
                label: 'Ventas',
                borderColor: 'rgb(0,216,255,0.9)',
                data: _getAttribute("ventas",ventas,0),
                fill: false
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels={_getAttribute("_id",ventas,0)}
          />
        </CCardBody>
      </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default Dashboard
