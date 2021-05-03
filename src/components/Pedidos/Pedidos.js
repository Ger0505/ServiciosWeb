import React, { useState, useEffect } from "react";
import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
  CDropdown,
  CDropdownItem,
  CDropdownDivider,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { API, Session } from "../../helpers";

// let pedidos = null;
// const getPedidos = () => {
//   pedidos = API.getData("ped/emp/608901d29429db11d461035c", "GET").then(
//     (data) => data
//   );
// };
const Pedidos = () => {
  const usersData = [
    {
      id: 0,
      registrado: "2018/01/01",
      hora: "12:00 p.m.",
      tipo: "Guest",
      usuario: "John Doe",
      status: "Pending",
    },
    {
      id: 1,
      registrado: "2018/01/01",
      hora: "12:00 p.m.",
      tipo: "Member",
      usuario: "Samppa Nori",
      status: "Active",
    },
    {
      id: 2,
      registrado: "2018/02/01",
      hora: "12:00 p.m.",
      tipo: "Staff",
      usuario: "Estavan Lykos",
      status: "Banned",
    },
    {
      id: 3,
      registrado: "2018/02/01",
      hora: "12:00 p.m.",
      tipo: "Admin",
      usuario: "Chetan Mohamed",
      status: "Inactive",
    },
    {
      id: 4,
      registrado: "2018/03/01",
      hora: "12:00 p.m.",
      tipo: "Member",
      usuario: "Derick Maximinus",
      status: "Pending",
    },
    {
      id: 5,
      registrado: "2018/01/21",
      hora: "12:00 p.m.",
      tipo: "Staff",
      usuario: "Friderik Dávid",
      status: "Active",
    },
    {
      id: 6,
      registrado: "2018/01/01",
      hora: "12:00 p.m.",
      tipo: "Member",
      usuario: "Yiorgos Avraamu",
      status: "Active",
    },
    {
      id: 7,
      registrado: "2018/02/01",
      hora: "12:00 p.m.",
      tipo: "Staff",
      usuario: "Avram Tarasios",
      status: "Banned",
    },
    {
      id: 8,
      registrado: "2018/02/01",
      hora: "12:00 p.m.",
      tipo: "Admin",
      usuario: "Quintin Ed",
      status: "Inactive",
    },
    {
      id: 9,
      registrado: "2018/03/01",
      hora: "12:00 p.m.",
      tipo: "Member",
      usuario: "Enéas Kwadwo",
      status: "Pending",
    },
    {
      id: 10,
      registrado: "2018/01/21",
      hora: "12:00 p.m.",
      tipo: "Staff",
      usuario: "Agapetus Tadeáš",
      status: "Active",
    },
    {
      id: 11,
      registrado: "2018/01/01",
      hora: "12:00 p.m.",
      tipo: "Member",
      usuario: "Carwyn Fachtna",
      status: "Active",
    },
    {
      id: 12,
      registrado: "2018/02/01",
      hora: "12:00 p.m.",
      tipo: "Staff",
      usuario: "Nehemiah Tatius",
      status: "Banned",
    },
    {
      id: 13,
      registrado: "2018/02/01",
      hora: "12:00 p.m.",
      tipo: "Admin",
      usuario: "Ebbe Gemariah",
      status: "Inactive",
    },
    {
      id: 14,
      registrado: "2018/03/01",
      hora: "12:00 p.m.",
      tipo: "Member",
      usuario: "Eustorgios Amulius",
      status: "Pending",
    },
    {
      id: 15,
      registrado: "2018/01/21",
      hora: "12:00 p.m.",
      tipo: "Staff",
      usuario: "Leopold Gáspár",
      status: "Active",
    },
    {
      id: 16,
      registrado: "2018/01/01",
      hora: "12:00 p.m.",
      tipo: "Member",
      usuario: "Pompeius René",
      status: "Active",
    },
    {
      id: 17,
      registrado: "2018/02/01",
      hora: "12:00 p.m.",
      tipo: "Staff",
      usuario: "Paĉjo Jadon",
      status: "Banned",
    },
    {
      id: 18,
      registrado: "2018/02/01",
      hora: "12:00 p.m.",
      tipo: "Admin",
      usuario: "Micheal Mercurius",
      status: "Inactive",
    },
    {
      id: 19,
      registrado: "2018/03/01",
      hora: "12:00 p.m.",
      tipo: "Member",
      usuario: "Ganesha Dubhghall",
      status: "Pending",
    },
    {
      id: 20,
      registrado: "2018/01/21",
      hora: "12:00 p.m.",
      tipo: "Staff",
      usuario: "Hiroto Šimun",
      status: "Active",
    },
    {
      id: 21,
      registrado: "2018/01/01",
      hora: "12:00 p.m.",
      tipo: "Member",
      usuario: "Vishnu Serghei",
      status: "Active",
    },
    {
      id: 22,
      registrado: "2018/02/01",
      hora: "12:00 p.m.",
      tipo: "Staff",
      usuario: "Zbyněk Phoibos",
      status: "Banned",
    },
    {
      id: 23,
      registrado: "2018/01/01",
      hora: "12:00 p.m.",
      tipo: "Member",
      usuario: "Aulus Agmundr",
      status: "Pending",
    },
    {
      id: 42,
      registrado: "2001/05/25",
      hora: "12:00 p.m.",
      tipo: "Alien",
      usuario: "Ford Prefect",
      status: "Don't panic!",
    },
  ];

  const repartidores = [
    { id: 0, nombre: "Felipe", apellido: "Cruz Humberto" },
    { id: 1, nombre: "Francisco", apellido: "Hernández Carrasco" },
    { id: 2, nombre: "Karla", apellido: "Velazco Avendaño" },
    { id: 3, nombre: "Rodrigo", apellido: "Alejandro Muñoz" },
    { id: 4, nombre: "Karak", apellido: "Fitzjerland Kato" },
  ];

  const [details, setDetails] = useState([]);
  const [arrayJSON, setArrayJSON] = useState([]);
  useEffect(() => {
    const function1 = async () => {
      const pedidos = await API.getData(
        "ped/emp/608901d29429db11d461035c",
        "GET"
      );
      setArrayJSON(pedidos);
    };
    function1();
  }, []);

  // useEffect(() =>{
  //   const getPedidos = async () =>{
  //     let _id = Session.getSession()._id
  //     if(session){
  //       let res = API.getData("ped/" + _id, "GET")

  //     }
  //   }

  //   getPedidos()
  // },[])

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  // getPedidos();
  const fields = [
    { key: "usuario", label: "Usuario", _style: { width: "10%" } },
    { key: "fecha", label: "Fecha", _style: { width: "10%" } },
    { key: "hora", label: "Hora", _style: { width: "10%" } },
    { key: "tipo", _style: { width: "20%" } },
    "status",
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <CDataTable
      items={arrayJSON}
      fields={fields}
      columnFilter
      tableFilter
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots={{
        usuario: (item) => (
          <td>{`${item.usuario.nombre} ${item.usuario.apellidos}`}</td>
        ),
        status: (item) => (
          <td>
            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
          </td>
        ),
        show_details: (item, index) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => {
                  toggleDetails(index);
                }}
              >
                {details.includes(index) ? "Ocultar" : "Mostrar"}
              </CButton>
            </td>
          );
        },
        details: (item, index) => {
          return (
            <CCollapse show={details.includes(index)}>
              <CCardBody>
                <h4>{`${item.usuario.nombre} ${item.usuario.apellidos}`}</h4>
                <p className="text-muted">ID pedido: {item._id}</p>
                <p className="text-muted">Cantidad: {item.cantidad}</p>
                <p className="text-muted">Precio: {item.precio}</p>
                <p className="text-muted">User since: {item.descripcion}</p>
                <p className="text-muted">
                  Dirección: {item.usuario.direccion}
                </p>
                <CDropdown>
                  <CDropdownToggle color="success">Repartidor</CDropdownToggle>
                  <CDropdownMenu>
                    {repartidores.map((item) => {
                      return (
                        <CDropdownItem component="button">{`${item.nombre} ${item.apellido}`}</CDropdownItem>
                      );
                    })}
                    {/* <CDropdownItem component="button">Action</CDropdownItem>
                    <CDropdownItem component="button">
                      Another action
                    </CDropdownItem>
                    <CDropdownItem component="button">
                      Something else here
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem component="button">
                      Separated link
                    </CDropdownItem> */}
                  </CDropdownMenu>
                </CDropdown>
                <CButton size="sm" color="info">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" className="ml-1">
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

export default Pedidos;
