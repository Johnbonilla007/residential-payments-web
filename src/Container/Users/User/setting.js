import { InputsType } from "../../../Helpers/Constant";
import { utils } from "../../../Helpers/utils";

export const columnsReport = (
  onRenderActiveButton,
  permissionAccount,
  onRenderEmergyButton,
  onRenderFreeDevice,
  onRenderChanguePass,
  onRenderDeleteUser,
  onRenderFrequentVisitButton
) => {
  const columns = [
    {
      fieldName: "index",
      name: "#",
      width: "50px",
    },
    {
      fieldName: "fullName",
      name: "Nombre",
      width: "200px",
      isFilter: true,
    },
    {
      fieldName: "userName",
      name: "Usuario",
      width: "200px",
      isFilter: true,
    },
    {
      fieldName: "residence",
      name: "Residencia",
      width: "10em",
      noVisible: utils.hasPermission("BloqueoResidencia"),
    },
    {
      fieldName: "block",
      name: "Bloque",
      width: "10em",
      isFilter: true,
    },

    {
      fieldName: "houseNumber",
      name: "#casa",
      width: "10em",
      isFilter: true,
    },
    {
      fieldName: "phoneNumber",
      name: "Telefono",
      width: "5em",
    },
    {
      fieldName: "isActive",
      name: "Es Activo",
      isFilter: true,
      isBoolean: true,
      body: onRenderActiveButton,
      width: "10em",
    },
  ];

  columns.splice(4, 0, {
    fieldName: "email",
    name: "Correo",
    width: "5em",
    noVisible: !utils.hasPermission("VerCorreo"),
  });

  columns.push({
    fieldName: "allowEmergy",
    name: "Permitir Emergencia",
    isFilter: true,
    isBoolean: true,
    body: onRenderEmergyButton,
    width: "10em",
    noVisible: !utils.hasPermission("ActivarEmergencia"),
  });

  columns.push({
    fieldName: "allowRegisterFrequentVisit",
    name: "Permitir Visita Frecuente",
    isFilter: true,
    isBoolean: true,
    body: onRenderFrequentVisitButton,
    width: "10em",
    noVisible: !utils.hasPermission("ActivarVisitaFrecuente"),
  });

  columns.push({
    fieldName: "FreeDevice",
    name: "",
    isFilter: false,
    isBoolean: false,
    body: onRenderFreeDevice,
    width: "10em",
    noVisible: !utils.hasPermission("LiberarDispositivo"),
  });
  columns.push({
    fieldName: "ChangePass",
    name: "",
    isFilter: false,
    isBoolean: false,
    body: onRenderChanguePass,
    width: "10em",
    noVisible: !utils.hasPermission("CambiarContraseña"),
  });

  columns.push({
    fieldName: "DeleteUser",
    name: "",
    isFilter: false,
    isBoolean: false,
    body: onRenderDeleteUser,
    width: "10em",
    noVisible: !utils.hasPermission("EliminarUsuario"),
  });


  return columns;
};

export const columnsReportPDF = [
  {
    fieldName: "index",
    name: "#",
    width: "25px",
  },
  {
    fieldName: "fullName",
    name: "Nombre de Visita",
    width: "65px",
  },
  {
    fieldName: "userName",
    name: "Creado por",
    width: "65px",
  },
  {
    fieldName: "residence",
    name: "Residencia",
    width: "100px",
  },
  {
    fieldName: "block",
    name: "Bloque",
    width: "50px",
  },
  {
    fieldName: "houseNumber",
    name: "#Casa",
    width: "50px",
  },
  {
    fieldName: "creationDate",
    name: "Fecha de Creación",
    width: "80px",
  },
  {
    fieldName: "dateIn",
    name: "Fecha de Ingreso",
    width: "60px",
  },
  {
    fieldName: "dateOut",
    name: "Fecha de salida",
    width: "60px",
  },
];

export const fieldsUsers = (
  residentialList,
  isEditUser,
  getResidenceByResidential,
  residenceList
) => {
  const templateResidence = (item) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 15% 15%",
          width: "300px",
        }}
      >
        <div>{item.name}</div>
        <div>{item.block}</div>
        <div>{item.houseNumber}</div>
      </div>
    );
  };

  return [
    {
      name: "Usuario",
      type: InputsType.text,
      placeholder: "Usuario",
      fieldName: "userName",
      keyfilter: /^[a-zA-Z0-9ñÑ]+$/,
    },
    {
      name: "Contraseña",
      type: InputsType.password,
      placeholder: "Contraseña",
      fieldName: "password",
      disabled: isEditUser,
    },
    {
      name: "Residencial",
      type: InputsType.select,
      fieldName: "residentialId",
      targetValue: "id",
      options: residentialList,
      optionLabel: "name",
      optionValue: "id",
      fetchDataByItem: getResidenceByResidential,
    },
    {
      name: "Residencia",
      type: InputsType.select,
      fieldName: "residenceId",
      targetValue: "id",
      options: residenceList,
      optionLabel: "name",
      optionValue: "id",
      itemTemplate: templateResidence,
    },
    {
      name: "Género",
      type: InputsType.select,
      fieldName: "gender",
      targetValue: "gender",
      options: [{ gender: "Masculino" }, { gender: "Femenido" }],
      optionLabel: "gender",
      optionValue: "gender",
    },
    {
      name: "Nombre Completo",
      type: InputsType.text,
      placeholder: "Nombre Completo",
      fieldName: "fullName",
    },
    {
      name: "Correo",
      type: InputsType.text,
      placeholder: "Correo",
      fieldName: "email",
    },
    {
      name: "Telefono",
      type: InputsType.mask,
      mask: "9999-9999",
      placeholder: "Telefono",
      fieldName: "phoneNumber",
    },
    {
      name: "Tipo de usuario",
      type: InputsType.select,
      fieldName: "accountType",
      targetValue: "accountType",
      options: [
        { accountType: "RESD", name: "Residente" },
        { accountType: "GUARD", name: "Guardia" },
      ],
      optionLabel: "name",
      optionValue: "accountType",
    },
  ];
};
