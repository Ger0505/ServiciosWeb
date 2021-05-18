import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import WidgetsDropdown from './WidgetsDropdown'
import { API, Session } from "../../helpers";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [ventas, setVentas] = useState([]);

  useEffect(() =>{
    const getData = async () =>{
      let s = Session.getSession()
      if(!s) return 
      let res = await API.getData("ped/gb/" + s._id, "GET")
      if(res) setData(res)
      res = await API.getData("ped/gb/v/" + s._id, "GET")
      if(res) setVentas(res)
    }
    getData()
  },[])

  const _getAttribute = (atr,dataset) =>{
    let array = []
    dataset.forEach(item => array.push(item[atr]))
    return array
  }

  return (
    <>
    <WidgetsDropdown/>
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
                data: _getAttribute("pedidos", data)
              }
            ]}
            labels={_getAttribute("_id",data)}
            options={{
              tooltips: {
                enabled: true
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
                data: _getAttribute("ventas",ventas),
                fill: false
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels={_getAttribute("_id",ventas)}
          />
        </CCardBody>
      </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default Dashboard