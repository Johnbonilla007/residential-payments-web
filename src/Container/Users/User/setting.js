import { InputsType } from "../../../Helpers/Constant";
import { utils } from "../../../Helpers/utils";

export const columnsReport = (onRenderActiveButton, onRenderActions) => {
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
      name: "#Casa",
      width: "10em",
      isFilter: true,
    },
    {
      fieldName: "userName",
      name: "Usuario",
      width: "200px",
      isFilter: true,
    },
    {
      fieldName: "phoneNumber",
      name: "Telefono",
      width: "10em",
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

  columns.splice(2, 0, {
    fieldName: "email",
    name: "Correo",
    width: "5em",
    noVisible: !utils.hasPermission("VerCorreo"),
    isFilter: true,
  });

  columns.push({
    fieldName: "",
    name: "Acciones",
    body: onRenderActions,
    alignHeader: "center",
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

export const stages = {
  primeraEtapa: "Primera Etapa",
  segundaEtapa: "Segunda Etapa",
  terceraEtapa: "Tercera Etapa",
  cuartaEtapa: "Cuarta Etapa",
};

export const fieldsUsers = (
  _residentialList,
  isEditUser,
  _getResidenceByResidential,
  _residenceList
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

  if (isEditUser) {
    return [
      {
        name: "Nombre Completo",
        type: InputsType.text,
        placeholder: "Nombre Completo",
        fieldName: "fullName",
      },
      {
        name: "Usuario",
        type: InputsType.text,
        placeholder: "Usuario",
        fieldName: "userName",
        keyfilter: /^[a-zA-Z0-9ñÑ]+$/,
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
        name: "Género",
        type: InputsType.select,
        fieldName: "gender",
        targetValue: "gender",
        options: [{ gender: "Masculino" }, { gender: "Femenido" }],
        optionLabel: "gender",
        optionValue: "gender",
      },
    ];
  }

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
      name: "Bloque",
      type: InputsType.text,
      placeholder: "Bloque",
      fieldName: "block",
    },
    {
      name: "Número de Casa / Número de Lote",
      type: InputsType.text,
      placeholder: "# Casa/Lote",
      fieldName: "houseNumber",
    },
    {
      name: "Nombre Casa",
      type: InputsType.text,
      placeholder: "Nombre Casa",
      fieldName: "name",
    },
    {
      name: "Etapa",
      type: InputsType.select,
      placeholder: "Etapa",
      fieldName: "stage",
      options: [
        { stage: stages["primeraEtapa"] },
        { stage: stages["segundaEtapa"] },
        { stage: stages["terceraEtapa"] },
        { stage: stages["cuartaEtapa"] },
      ],
      optionValue: "stage",
      optionLabel: "stage",
      targetValue: "stage",
    },
    {
      name: "Color de Casa",
      type: InputsType.text,
      placeholder: "Color de Casa",
      fieldName: "color",
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
  ];
};

export const fieldsResidence = [
  {
    name: "¿Es Lote Baldío?",
    type: InputsType.checkbox,
    fieldName: "isEmptyLot",
  },
  {
    name: "Nombre",
    type: InputsType.text,
    placeholder: "Nombre",
    fieldName: "name",
  },
  {
    name: "Etapa",
    type: InputsType.select,
    placeholder: "Etapa",
    fieldName: "stage",
    options: [
      { stage: stages["primeraEtapa"] },
      { stage: stages["segundaEtapa"] },
      { stage: stages["terceraEtapa"] },
      { stage: stages["cuartaEtapa"] },
    ],
    optionValue: "stage",
    optionLabel: "stage",
    targetValue: "stage",
  },
  {
    name: "Bloque",
    type: InputsType.text,
    placeholder: "Bloque",
    fieldName: "block",
  },
  {
    name: "Número de Casa / Número de Lote",
    type: InputsType.text,
    placeholder: "# Casa/Lote",
    fieldName: "houseNumber",
  },
];

export const columnsResidences = (renderEditResidence) => [
  {
    fieldName: "name",
    name: "Nombre",
    width: "50px",
  },
  {
    fieldName: "stage",
    name: "Etapa",
    width: "50px",
  },
  {
    fieldName: "block",
    name: "Bloque",
    width: "50px",
  },
  {
    fieldName: "houseNumber",
    name: "Número de Casa",
    width: "50px",
  },
  { name: "Acciones", body: renderEditResidence },
];
