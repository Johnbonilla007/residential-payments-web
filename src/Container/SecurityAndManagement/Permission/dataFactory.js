import { InputsType } from "../../../Helpers/Constant";

export const fieldsRol = [
  {
    name: "Nombre",
    type: InputsType.text,
    placeholder: "Nombre",
    fieldName: "name",
  },
  {
    name: "Description",
    type: InputsType.text,
    placeholder: "Descripcion",
    fieldName: "description",
  },
];

export const fieldsPermission = (roles) => [
  {
    name: "Nombre",
    type: InputsType.text,
    placeholder: "Nombre",
    fieldName: "name",
  },
  {
    name: "Description",
    type: InputsType.text,
    placeholder: "Descripcion",
    fieldName: "description",
  },
  {
    name: "Tiene Accesso",
    type: InputsType.checkbox,
    fieldName: "isGranted",
  },
  {
    name: "Rol",
    type: InputsType.select,
    fieldName: "roleId",
    targetValue: "id",
    options: roles,
    optionLabel: "name",
    optionValue: "id",
  },
];

export const fieldsAsignPermission = (
  roles,
  permissionList,
  handleRolSelected,
  onPressEnter,
  userList,
  itemTemplateUser
) => {
  return [
    {
      name: "Rol",
      type: InputsType.select,
      fieldName: "roleId",
      targetValue: "id",
      options: roles,
      optionLabel: "name",
      optionValue: "id",
      fetchDataByItem: handleRolSelected,
    },
    {
      name: "Permisos",
      type: InputsType.multiselect,
      fieldName: "permissions",
      options: permissionList,
      optionLabel: "name",
    },
    {
      name: "Usuario",
      type: InputsType.text,
      placeholder: "Usuario",
      fieldName: "userName",
      onPressEnter: onPressEnter,
    },
    {
      name: "Usuarios",
      type: InputsType.listbox,
      fieldName: "userName",
      options: userList,
      optionLabel: "userName",
      itemTemplate: itemTemplateUser,
    },
  ];
};
