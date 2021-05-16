import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import WidgetsDropdown from '../WidgetsDropdown'
import DocsLink from 'src/reusable/DocsLink.js'
import { API, Session } from "../../helpers";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() =>{
    const getData = async () =>{
      let s = Session.getSession()
      if(!s) return 
      let res = await API.getData("ped/gb/" + s._id, "GET")
      if(res) setData(res)
    }
    getData()
  },[])

  const _getAttribute = atr =>{
    let array = []
    data.map(item =>{
      array.push(item[atr])
    })
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
          <DocsLink href="http://www.chartjs.org"/>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: 'No. de pedidos',
                backgroundColor: '#f87979',
                data: _getAttribute("pedidos")
              }
            ]}
            labels={_getAttribute("_id")}
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
    </>
  )
}

export default Dashboard
