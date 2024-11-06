import { utils } from "./utils";

export const TipoCuentas = {
  administrador: "ADMON",
  subAdministrador: "PRES",
  residente: "RESD",
  guardia: "GUARD",
};

export const getToken = async () => {
  const userInfo = await utils.getInfoStorage("userInfo");

  return userInfo.token;
};

export const InputsType = {
  text: "text",
  textarea: "textarea",
  number: "number",
  select: "select",
  checkbox: "checkbox",
  password: "password",
  mask: "mask",
  listbox: "listbox",
  multiselect: "multiselect",
  date: "date",
};

export const REPORT_TYPE = {
  Incomes: "Incomes",
  Spending: "Spending",
};
