import React, { useState, useEffect } from "react";
import "../../pages/Login/Login.scss";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { API, FileURL } from "../../helpers";
import { useForm, Controller } from "react-hook-form";

const FileUpload = ({ actualLogo, cb }) => {
  const [imageSrc, setImageSrc] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setImageSrc(actualLogo);
    register("logo", {
      required: { value: true, message: "El logo es requerido" },
    });
  }, [actualLogo, register]);

  const _onSubmit = async (data) => {
    console.log(data);
    await API.getFile(data.logo[0]);
    cb(data.logo[0].name);
  };

  return (
    <CCard>
      <CCardHeader>
        <strong>Imagen de la empresa</strong>
      </CCardHeader>
      <CCardBody>
        <form
          onSubmit={handleSubmit(_onSubmit)}
          encType="multipart/form-data"
          className="login100-form validate-form"
          style={{ paddingTop: 0 }}
        >
          <div className="wrap-input100 validate-input">
            <input
              className="input100 has-val"
              type="file"
              name="logo"
              onChange={(e) => {
                setValue("logo", e.target.files);
              }}
            />
            <span className="focus-input100"></span>
          </div>
          {errors.logo && (
            <small style={{ color: "red" }}>{errors.logo?.message}</small>
          )}
          <div className="container-login100-form-btn">
            <button
              type="submit"
              className="login100-form-btn"
              style={{
                background: "#2a1ab9",
                color: "#fff",
                border: "none",
                marginTop: "0.5em",
              }}
            >
              Cambiar logo
            </button>
          </div>
        </form>
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
            src={FileURL + imageSrc}
            alt="logoImage"
          />
        </div>
      </CCardBody>
    </CCard>
  );
};

export default FileUpload;
