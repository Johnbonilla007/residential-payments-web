import { InputsType } from "../../../../../../Helpers/Constant";

export const fieldsPaymentAsign = (paymentTypes, templatePayment) => [
  {
    name: "Tipo de Pago",
    type: InputsType.select,
    fieldName: "paymentNo",
    targetValue: "paymentTypeNo",
    options: paymentTypes,
    optionLabel: "description",
    optionValue: "paymentTypeNo",
    itemTemplate: templatePayment,
  },
  {
    fieldName: "discount",
    placeHolder: "Descuento",
    name: "Descuento",
    type: InputsType.number,
    placeholder: "Descuento",
  },
  {
    fieldName: "initialPaymentDate",
    placeHolder: "Fecha Inicial del pago",
    name: "Fecha Inicial del pago",
    type: InputsType.date,
    placeholder: "Fecha Inicial del pago",
  },
  {
    fieldName: "hasFollowUp",
    placeHolder: "Seguimiento de fechas",
    name: "Seguimiento de fechas",
    type: InputsType.checkbox,
    placeholder: "Seguimiento de fechas",
  },
  {
    fieldName: "hasFollowUpApp",
    placeHolder: "Seguimiento de app",
    name: "Seguimiento de app",
    type: InputsType.checkbox,
    placeholder: "Seguimiento de app",
    relationalValue: "hasFollowUp",
  },
];
