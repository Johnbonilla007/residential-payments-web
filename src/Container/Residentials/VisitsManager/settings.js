import { InputsType } from "../../../Helpers/Constant";
import { TableStyled } from "./styles";

export const columnsTable = [
  {
    fieldName: "visitNo",
    name: "Número de Visita",
    type: InputsType.text,
    placeholder: "Número de Visita",
  },
  {
    fieldName: "fullName",
    name: "Nombre Completo",
    type: InputsType.text,
    placeholder: "Nombre Completo",
  },
  {
    fieldName: "residence",
    name: "Residencia",
    type: InputsType.text,
    placeholder: "Residencia",
  },
  {
    fieldName: "date",
    name: "Fecha",
    type: InputsType.date,
    placeholder: "Selecciona una Fecha",
  },
  {
    fieldName: "status",
    name: "Estado",
    type: InputsType.text,
    placeholder: "Selecciona un Estado",
    // width: 1500,
  },
];
export const dummyVisits = [
  {
    visitNo: 1,
    eventId: "E123",
    fullName: "John Doe",
    isFrequent: true,
    userName: "jdoe",
    residence: "Residencial Sunset",
    houseNo: "12B",
    comment: "Entrega de paquete",
    isDelivery: true,
    daysRange: 3,
    hoursRange: "10:00 - 18:00",
    residenceNo: "R001",
    creationDate: "2023-12-20",
    active: true,
    color: "#FF0000",
  },
  {
    visitNo: 2,
    eventId: "E124",
    fullName: "Jane Smith",
    isFrequent: false,
    userName: "jsmith",
    residence: "Residencial Sunrise",
    houseNo: "5A",
    comment: "Visita personal",
    isDelivery: false,
    daysRange: 1,
    hoursRange: "09:00 - 15:00",
    residenceNo: "R002",
    creationDate: "2023-12-22",
    active: false,
    color: "#00FF00",
  },
  {
    visitNo: 3,
    eventId: "E125",
    fullName: "Carlos López",
    isFrequent: true,
    userName: "clopez",
    residence: "Residencial Vista Verde",
    houseNo: "7C",
    comment: "Revisión técnica",
    isDelivery: false,
    daysRange: 2,
    hoursRange: "08:00 - 17:00",
    residenceNo: "R003",
    creationDate: "2023-12-21",
    active: true,
    color: "#0000FF",
  },
];

export const fieldsVisitForm = [
  {
    fieldName: "fullName",
    placeHolder: "Nombre Completo",
    name: "Nombre Completo",
    type: InputsType.text,
    placeholder: "Nombre Completo",
  },
  {
    fieldName: "visitCreateDate",
    placeHolder: "Fecha",
    name: "Fecha",
    type: InputsType.date,
    placeholder: "Fecha",
  },
  {
    fieldName: "isFrequent",
    placeHolder: "¿Es Frecuente?",
    name: "¿Es Frecuente?",
    type: InputsType.checkbox,
    placeholder: "¿Es Frecuente?",
  },
  {
    fieldName: "comment",
    placeHolder: "Comentario",
    name: "Comentario",
    type: InputsType.text,
    placeholder: "Comentario",
  },
];
