import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CForm, CLabel, CInputFile, CButton, CFormText} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { API } from "../../helpers"
import { useForm, Controller } from "react-hook-form"

const FileUpload = ({actualLogo, cb}) => {
    const [imageSrc, setImageSrc] = useState('')
    const { control, handleSubmit, formState: { errors } } = useForm()

    useEffect(() =>{
        setImageSrc(actualLogo)
    },[actualLogo])

    const _onSubmit = async data => {
        await API.getFile(data.logo[0])
        cb(data.logo[0].name)
    }

    // const _onChangeImagePreview =  e =>{
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setImageSrc('')
    //         return
    //     }
    //     const objectUrl = URL.createObjectURL(e.target.files[0])
    //     setImageSrc(objectUrl)
    // }

    return ( 
        <CCard>
        <CCardHeader>
          <strong>Imagen de la empresa</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit(_onSubmit)} encType="multipart/form-data" className="form-horizontal">
            <CFormGroup row>
              <CLabel col md={3}>Logo</CLabel>
              <CCol xs="12" md="9">
                  <Controller
                  name="logo"
                  control={control}
                  render={({ field }) => <CInputFile {...field} custom id="logo" />}
                  rules={{ required: { value: true, message: 'El logo es requerido' }}}
                  />
                  { errors.logo && <CFormText className="help-block">{errors.logo?.message}</CFormText>}
                
                <CLabel htmlFor="logo" variant="custom-file">
                  Escoge imagen...
              </CLabel>
              </CCol>
            </CFormGroup>
            <CFormGroup>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Actualizar Imagen</CButton>
            </CFormGroup>
          </CForm>
            <div style={{marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img style={{width:'50%'}} src={"http://localhost:3002/uploads/" + imageSrc} alt="logoImage"/>
            </div>
        </CCardBody>
      </CCard>
    )
}
 
export default FileUpload