import React, { useEffect } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { Session } from "../../helpers"
import { useHistory } from "react-router-dom";

const TheLayout = () => {
  const history = useHistory()

  useEffect(() =>{
    const isSession = async () =>{
      let s = await Session.getSession()
      if(!s) history.push("Login")
    }
    isSession()
  },[history])

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
