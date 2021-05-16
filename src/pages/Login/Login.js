import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom"
import { API, Session } from "../../helpers"
import './Login.scss'

const Login = () => {
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setError] = useState(false)
    const history = useHistory()

    const _onSubmit = async e =>{
        e.preventDefault()
        let res = await API.getBody("emp/login","POST", {correo: correo, password: password})
        if(res.code === 401) setError(true)
        else {
            Session.crearSession(res.empresa)
            history.push("/dash")
        }
    }

    const _onChangeInput = e =>{
        let input = e.target
        if(input.value !== '') input.classList.add('has-val')
        else input.classList.remove('has-val')
    }

    return (
        <div className="div-login">
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form onSubmit={_onSubmit} className="login100-form validate-form">
                            <span className="login100-form-title">
                                Login
					        </span>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            {isError && <span style={{color: 'red'}}>Correo y/o contraseña incorrecta</span>}
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" required
                                    value={correo}
                                    onChange={e => {_onChangeInput(e); setCorreo(e.target.value)}}
                                />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Correo Electrónico</span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" name="pass"
                                    value={password}
                                    onChange={e => {_onChangeInput(e); setPassword(e.target.value)}}
                                />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Contraseña</span>
                            </div>
                            {/* <div className=" checkbox flex-sb-m w-full p-t-3 p-b-32">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                    <label className="label-checkbox100" for="ckb1">
                                        Recuerdame
							        </label>
                                </div>
                            </div> */}
                            <div className="container-login100-form-btn">
                                <button type="submit" className="login100-form-btn">
                                    Iniciar Sesión
						        </button>
                            </div>
                            <div className="text-center p-t-50 p-b-20">
                                <span className="txt2">
                                    o <Link to="/register">Registrarse</Link>
						        </span>
                            </div>
                        </form>
                        <div className="login100-more"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login