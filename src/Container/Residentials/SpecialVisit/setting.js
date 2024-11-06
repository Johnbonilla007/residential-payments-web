import { InputsType } from "../../../Helpers/Constant";

export const fieldsSpecialVisit = (residentials, templateResidentials) => [
  {
    name: "Residencial",
    type: InputsType.select,
    fieldName: "residentialNo",
    targetValue: "residentialNo",
    options: residentials,
    optionLabel: "name",
    optionValue: "residentialNo",
    itemTemplate: templateResidentials,
  },
  {
    fieldName: "name",
    name: "Nombre",
    type: InputsType.text,
    placeholder: "Nombre",
  },
  {
    fieldName: "IsRegisteredExit",
    placeHolder: "Registrar Salida",
    name: "Registrar Salida",
    type: InputsType.checkbox,
  },
];
