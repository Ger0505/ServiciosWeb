import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API, Session } from "../../helpers";
import "./Login.scss";

const Login = () => {
  const [isError, setError] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("correo", {
      required: { value: true, message: "El correo es requerido" },
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/,
        message: "Formato de correo incorrecto",
      },
    });
    register("password", {
      required: { value: true, message: "La contraseña es requerida" }
    });
  }, [register]);

  const _onSubmit = async data => {
    let res = await API.getLogin("log/emp", data);
    if (res.code === 401) setError(true);
    else {
      Session.crearSession(res.empresa);
      Session.crearToken(res.token);
      history.push("/dash");
    }
  };

  const _onChangeInput = (e) => {
    let input = e.target;
    if (input.value !== "") input.classList.add("has-val");
    else input.classList.remove("has-val");
  };

  return (
    <div className="div-login">
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form onSubmit={handleSubmit(_onSubmit)} className="login100-form validate-form">
              <span className="login100-form-title">Login</span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isError && (
                  <span style={{ color: "red" }}>
                    Correo y/o contraseña incorrecta
                  </span>
                )}
              </div>
              <div
                className="wrap-input100 validate-input"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  onChange={(e) => {
                    _onChangeInput(e);
                    setValue("correo", e.target.value);
                  }}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Correo Electrónico</span>
              </div>
              <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                {errors.correo && (
                  <small style={{ color: "red" }}>{errors.correo?.message}</small>
                )}
              </div>
              <div
                className="wrap-input100 validate-input"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  onChange={(e) => {
                    _onChangeInput(e);
                    setValue("password", e.target.value);
                  }}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Contraseña</span>
              </div>
              <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                {errors.password && (
                  <small style={{ color: "red" }}>
                    {errors.password?.message}
                  </small>
                )}
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
  );
};

export default Login;
