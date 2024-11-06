import { TipoCuentas } from "../../../Helpers/Constant";
import { getRequestUserInfo } from "../../../Helpers/restClient";
import { utils } from "../../../Helpers/utils";

export const columnsReport = (
  onRenderButtomImgId,
  permissionAccount,
  onRenderButtomImgCar
) => {
  const userInfo = getRequestUserInfo();
  const columnsAdmin = [
    {
      body: onRenderButtomImgId,
      width: "6em",
    },
    {
      body: onRenderButtomImgCar,
      width: "8em",
    },
    {
      name: "Placa",
      fieldName: "imgCar",
      width: "100px",
      isFilter: true,
    },
    {
      name: "Rótulo",
      fieldName: "label",
      width: "100px",
      isFilter: true,
    },
  ];
  const columns = [
    {
      fieldName: "index",
      name: "#",
      width: "50px",
    },
    {
      fieldName: "fullName",
      name: "Nombre de Visita",
      width: "150px",
      isFilter: true,
    },
    {
      fieldName: "userName",
      name: "Creado por",
      width: "100px",
      isFilter: true,
    },
    {
      fieldName: "residence",
      name: "Residencia",
      width: "5em",
      noVisible: utils.hasPermission("BloqueoResidencia"),
      isFilter: true,
    },
    {
      fieldName: "block",
      name: "Bloque",
      width: "5em",
      isFilter: true,
    },

    {
      fieldName: "houseNumber",
      name: "#casa",
      width: "5em",
      isFilter: true,
    },
    {
      fieldName: "isFrequent",
      name: "Es Frecuente",
      filterPlaceHolder: "Filtar por frecuente",
      width: "3em",
      isFilter: true,
      isBoolean: true,
    },
    {
      fieldName: "eventName",
      name: "Evento",
      width: "150px",
      isFilter: true,
    },
    {
      fieldName: "visitActive",
      name: "Activa",
      filterPlaceHolder: "Buscar por activas",
      width: "3em",
      isFilter: true,
      isBoolean: true,
    },
    {
      fieldName: "comment",
      name: "Comentario",
      filterPlaceHolder: "Buscar por comentario",
      width: "3em",
    },
    {
      fieldName: "commentIn",
      name: "Comentario Entrada",
      filterPlaceHolder: "Buscar por comentario",
      width: "3em",
    },
    {
      fieldName: "commentOut",
      name: "Comentario Salida",
      filterPlaceHolder: "Buscar por comentario",
      width: "3em",
    },
    {
      fieldName: "visitCreateDate",
      name: "Fecha de creación",
      filterPlaceHolder: "Buscar por fecha de ingreso",
      width: "10em",
    },
    {
      fieldName: "dateIn",
      name: "Fecha de Ingreso",
      filterPlaceHolder: "Buscar por fecha de ingreso",
      width: "10em",
    },
    {
      fieldName: "dateOut",
      name: "Fecha de salida",
      filterPlaceHolder: "Buscar por fecha de salida",
      width: "10em",
    },
  ];

  if (permissionAccount === TipoCuentas.administrador) {
    columnsAdmin.forEach((item) => columns.push(item));
  } else {
    if (utils.hasPermission("VerPlaca")) {
      columns.push({
        name: "Placa",
        fieldName: "imgCar",
        width: "100px",
        isFilter: true,
      });
    }
    if (utils.hasPermission("VerPlaca")) {
      columns.push({
        name: "Rótulo",
        fieldName: "label",
        width: "100px",
        isFilter: true,
      });
    }
    if (utils.hasPermission("VerImagenPlaca")) {
      columns.push({
        name: "Imagen Placa",
        body: onRenderButtomImgCar,
        width: "6em",
      });
    }
    if (utils.hasPermission("VerImagenIdentidad")) {
      columns.push({
        name: "Imagen Identidad",
        body: onRenderButtomImgId,
        width: "8em",
      });
    }
  }
  return columns;
};

export const columnsReportPDF = () => {
  const userInfo = getRequestUserInfo();
  return [
    {
      fieldName: "index",
      name: "#",
      width: "20px",
    },
    {
      fieldName: "fullName",
      name: "Nombre de Visita",
      width: "65px",
    },
    {
      fieldName: "userName",
      name: "Creado por",
      width: "50px",
    },
    {
      fieldName: "residence",
      name: "Residencia",
      width: "60px",
      noExport: utils.hasPermission("BloqueoResidencia"),
    },
    {
      fieldName: "block",
      name: "Bloque",
      width: "40px",
    },
    {
      fieldName: "houseNumber",
      name: "#Casa",
      width: "40px",
    },
    {
      fieldName: "label",
      name: "Rótulo",
      width: "50px",
    },
    {
      fieldName: "imgCar",
      name: "Placa",
      width: "50px",
    },
    {
      fieldName: "visitCreateDate",
      name: "Fecha de Creación",
      width: "70px",
    },
    {
      fieldName: "dateIn",
      name: "Fecha de Ingreso",
      width: "70px",
    },
    {
      fieldName: "dateOut",
      name: "Fecha de salida",
      width: "70px",
    },
  ];
};
