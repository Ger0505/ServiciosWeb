import React, { useState, useEffect } from "react";
import "../Login/Login.scss";
import { API } from "../../helpers";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Registro = () => {
  const [errorMsg, seterrorMsg] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  useEffect(() => {
    register("tipo", {
      required: { value: true, message: "El tipo es requerido" },
    });
    register("nombre", {
      required: { value: true, message: "El nombre es requerido" },
      pattern: {
        value: /^[a-záéíúóñA-ZÁÉÍÓÚÑ '.-]*$/,
        message: "Formato de nombre inválido",
      },
    });
    register("descripcion", {
      required: { value: true, message: "La descripción es requerida" },
    });
    register("correo", {
      required: { value: true, message: "El correo es requerido" },
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/,
        message: "Formato de correo incorrecto",
      },
    });
    register("direccion", {
      required: { value: true, message: "La dirección es requerida" },
    });
    register("telefono", {
      required: { value: true, message: "El teléfono es requerido" },
      pattern: { value: /[0-9]{10}/, message: "Longtud de 10 dígitos" },
    });
    register("password", {
      required: { value: true, message: "La contraseña es requerida" },
      minLength: { value: 8, message: "Tener al menos 8 carácteres" },
    });
    register("logo", {
      required: { value: true, message: "El logo es requerido" },
    });
    return () => URL.revokeObjectURL(uploadedImage);
  }, [register, uploadedImage]);

  const _onSubmit = async (data) => {
    if(data.logo[0].type !== "image/png" && 
       data.logo[0].type !== "image/jpeg" && 
       data.logo[0].type !== "image/svg+xml" && 
       data.logo[0].type !== "image/jpg"){
        seterrorMsg("Formato de logo inválido, acepta png,jpg,jpeg,svg");
        return;
    }
    const params = {
      correo: data.correo,
      descripcion: data.descripcion,
      direccion: data.direccion,
      logo: data.logo[0].name,
      nombre: data.nombre,
      password: data.password,
      telefono: parseInt(data.telefono),
      tipo: parseInt(data.tipo),
    };
    let res = await API.getLogin("log/emp/insert", params);
    if (res.hasOwnProperty("status")) {
      seterrorMsg(res.msg);
    } else {
      await API.getFile(data.logo[0]);
      history.push("/login");
    }
  };

  const _onChangeInput = (e) => {
    let input = e.target;
    if (input.value !== "") input.classList.add("has-val");
    else input.classList.remove("has-val");
  };

  const _onChangeImagePreview = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadedImage("");
      return;
    }
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setUploadedImage(objectUrl);
  };
  return (
    <div className="div-login">
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              onSubmit={handleSubmit(_onSubmit)}
              encType="multipart/form-data"
              className="login100-form validate-form"
              style={{ paddingTop: 40 }}
            >
              <span className="login100-form-title">Registro de empresa</span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></div>
              <div className="wrap-input100 validate-input">
                <select
                  name="tipo"
                  className="input100 has-val"
                  style={{ border: "1px white solid" }}
                  onChange={(e) => {
                    setValue("tipo", e.target.value);
                  }}
                >
                  <option value="" selected>
                    Selecciona servicio
                  </option>
                  <option value="1">Gas</option>
                  <option value="2">Agua Purificada</option>
                </select>
                <span className="focus-input100"></span>
                <span className="label-input100">Tipo de Servicio</span>
              </div>
              {errors.tipo && (
                <small style={{ color: "red" }}>{errors.tipo?.message}</small>
              )}
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="nombre"
                  onChange={(e) => {
                    _onChangeInput(e);
                    setValue("nombre", e.target.value);
                  }}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Nombre de la empresa</span>
              </div>
              {errors.nombre && (
                <small style={{ color: "red" }}>{errors.nombre?.message}</small>
              )}
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <textarea
                  name="descripcion"
                  className="input100"
                  onChange={(e) => {
                    _onChangeInput(e);
                    setValue("descripcion", e.target.value);
                  }}
                ></textarea>
                <span className="focus-input100"></span>
                <span className="label-input100">
                  Descripción de la empresa
                </span>
              </div>
              {errors.descripcion && (
                <small style={{ color: "red" }}>
                  {errors.descripcion?.message}
                </small>
              )}
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="email"
                  name="correo"
                  onChange={(e) => {
                    _onChangeInput(e);
                    setValue("correo", e.target.value);
                  }}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Correo Electrónico</span>
              </div>
              {errors.correo && (
                <small style={{ color: "red" }}>{errors.correo?.message}</small>
              )}
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="direccion"
                  onChange={(e) => {
                    _onChangeInput(e);
                    setValue("direccion", e.target.value);
                  }}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Dirección</span>
              </div>
              {errors.direccion && (
                <small style={{ color: "red" }}>
                  {errors.direccion?.message}
                </small>
              )}
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="tel"
                  name="telefono"
                  onChange={(e) => {
                    _onChangeInput(e);
                    setValue("telefono", e.target.value);
                  }}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Teléfono</span>
              </div>
              {errors.telefono && (
                <small style={{ color: "red" }}>
                  {errors.telefono?.message}
                </small>
              )}
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  onChange={(e) => {
                    _onChangeInput(e);
                    setValue("password", e.target.value);
                  }}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Contraseña</span>
              </div>
              {errors.password && (
                <small style={{ color: "red" }}>
                  {errors.password?.message}
                </small>
              )}
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100 has-val"
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={(e) => {
                    seterrorMsg("");
                    _onChangeImagePreview(e);
                    setValue("logo", e.target.files);
                  }}
                />
                <span className="focus-input100"></span>
                <span className="label-input100" style={{ fontSize: 15 }}>
                  Logo
                </span>
              </div>
              {errors.logo && (
                <small style={{ color: "red" }}>{errors.logo?.message}</small>
              )}
              {uploadedImage !== "" ? (
                <div
                  style={{
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: "50%" }}
                    src={uploadedImage}
                    alt="uploadedImage"
                  />
                </div>
              ) : null}
              {errorMsg !== "" && (
                <small style={{ color: "red" }}>{errorMsg}</small>
              )}
              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  Iniciar Sesión
                </button>
              </div>
            </form>
            <div className="register100-more"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
