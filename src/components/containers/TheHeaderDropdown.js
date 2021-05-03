import React, { useState, useEffect } from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Session } from "../../helpers"
import { useHistory } from 'react-router-dom'

const URL_IMAGE = "http://localhost:3002/uploads/"

const TheHeaderDropdown = () => {
  const history = useHistory()
  const [imageProfile, setImageProfile] = useState('')
  const [altImage, setAltImage] = useState('');

  useEffect(() =>{
    const getSession = async () =>{
      let _s = await Session.getSession()
      setImageProfile(URL_IMAGE + _s.logo)
      setAltImage(_s.nombre)
    }
    getSession()
  },[history])

  const _cerrarSesion = () =>{
    Session.removeSession()
    history.push("/login")
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={imageProfile}
            className="c-avatar-img"
            alt={altImage}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem onClick={_cerrarSesion}>
          <CIcon name="cil-settings" className="mfe-2" />
          Cerrar Sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
