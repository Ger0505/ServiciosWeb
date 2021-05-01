import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCol, CContainer, CDataTable, CFade, CRow, CButton, CCollapse, 
CCardBody, CForm, CLabel, CInputGroup, CInputGroupPrepend, CInput, CInputGroupText, CInputGroupAppend, CFormGroup } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useForm, Controller } from "react-hook-form";

const Repartidor = () => {
    const [collapsed, setCollapsed] = useState(true)
    const [showElements, setShowElements] = useState(true)
    const { control, handleSubmit, formState: { errors } } = useForm()

  
    const usersData = [
        { id: 0, nombre: '2018/01/01', apellidos:'12:00 p.m.', telefono: 'Guest', correo: 'John Doe' },
        { id: 1, nombre: '2018/01/01', apellidos:'12:00 p.m.', telefono: 'Member', correo: 'Samppa Nori' },
        { id: 2, nombre: '2018/02/01', apellidos:'12:00 p.m.', telefono: 'Staff', correo: 'Estavan Lykos' },
        { id: 3, nombre: '2018/02/01', apellidos:'12:00 p.m.', telefono: 'Admin', correo: 'Chetan Mohamed' },
        { id: 4, nombre: '2018/03/01', apellidos:'12:00 p.m.', telefono: 'Member', correo: 'Derick Maximinus' },
        { id: 5, nombre: '2018/01/21', apellidos:'12:00 p.m.', telefono: 'Staff', correo: 'Friderik Dávid' },
        { id: 6, nombre: '2018/01/01', apellidos:'12:00 p.m.', telefono: 'Member', correo: 'Yiorgos Avraamu' },
        { id: 7, nombre: '2018/02/01', apellidos:'12:00 p.m.', telefono: 'Staff', correo: 'Avram Tarasios' },
        { id: 8, nombre: '2018/02/01', apellidos:'12:00 p.m.', telefono: 'Admin', correo: 'Quintin Ed' },
        { id: 9, nombre: '2018/03/01', apellidos:'12:00 p.m.', telefono: 'Member', correo: 'Enéas Kwadwo' },
        { id: 10, nombre: '2018/01/21', apellidos:'12:00 p.m.', telefono: 'Staff', correo: 'Agapetus Tadeáš' },
        { id: 11, nombre: '2018/01/01', apellidos:'12:00 p.m.', telefono: 'Member', correo: 'Carwyn Fachtna' },
        { id: 12, nombre: '2018/02/01', apellidos:'12:00 p.m.', telefono: 'Staff', correo: 'Nehemiah Tatius' },
        { id: 13, nombre: '2018/02/01', apellidos:'12:00 p.m.', telefono: 'Admin', correo: 'Ebbe Gemariah' },
        { id: 14, nombre: '2018/03/01', apellidos:'12:00 p.m.', telefono: 'Member', correo: 'Eustorgios Amulius' },
        { id: 15, nombre: '2018/01/21', apellidos:'12:00 p.m.', telefono: 'Staff', correo: 'Leopold Gáspár' },
        { id: 16, nombre: '2018/01/01', apellidos:'12:00 p.m.', telefono: 'Member', correo: 'Pompeius René' },
        { id: 17, nombre: '2018/02/01', apellidos:'12:00 p.m.', telefono: 'Staff', correo: 'Paĉjo Jadon' },
        { id: 18, nombre: '2018/02/01', apellidos:'12:00 p.m.', telefono: 'Admin', correo: 'Micheal Mercurius' },
        { id: 19, nombre: '2018/03/01', apellidos:'12:00 p.m.', telefono: 'Member', correo: 'Ganesha Dubhghall' },
        { id: 20, nombre: '2018/01/21', apellidos:'12:00 p.m.', telefono: 'Staff', correo: 'Hiroto Šimun'},
        { id: 21, nombre: '2018/01/01', apellidos:'12:00 p.m.', telefono: 'Member', correo: 'Vishnu Serghei' },
        { id: 22, nombre: '2018/02/01', apellidos:'12:00 p.m.', telefono: 'Staff', correo: 'Zbyněk Phoibos' },
        { id: 23, nombre: '2018/01/01', apellidos:'12:00 p.m.', telefono: 'Member', correo: 'Aulus Agmundr' },
        { id: 42, nombre: '2001/05/25', apellidos:'12:00 p.m.', telefono: 'Alien', correo: 'Ford Prefect' }
      ]
    
    const fields = [
        { key: 'id', _style: { width: '10%' } },
        { key: 'nombre', _style: { width: '10%' } },
        { key: 'apellidos', _style: { width: '10%' } },
        { key: 'telefono', _style: { width: '20%' } },
        { key: 'correo', _style: { width: '40%' } }
    ]

    return (
        <CContainer>
            <CRow>
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
                />
            </CRow>
            <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                <strong>Agregar Repartidor</strong>
                <div className="card-header-actions">
                  <CButton color="link" className="card-header-action btn-setting">
                    <CIcon name="cil-settings" />
                  </CButton>
                  <CButton 
                    color="link" 
                    className="card-header-action btn-minimize" 
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <CIcon name={ collapsed ? "cil-arrow-top" : "cil-arrow-bottom"} />
                  </CButton>
                  <CButton 
                    color="link" 
                    className="card-header-action btn-close" 
                    onClick={() => setShowElements(false)}
                  >
                    <CIcon name="cil-x" />
                  </CButton>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <CForm className="form-horizontal">
                    <CFormGroup>
                      <CLabel htmlFor="nombre">Nombre</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          <Controller
                            name="nombre"
                            control={control}
                            defaultValue=""
                          />
                          <CInput id="nombre" name="nombre" size="16" type="text" />
                        </CInputGroup>
                        <p className="help-block">Here's some help text</p>
                      </div>
                    </CFormGroup>
                  <div className="form-actions">
                      <CButton type="submit" color="primary">Save changes</CButton>
                      <CButton color="secondary">Cancel</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
        </CContainer>
    )
}

export default Repartidor;