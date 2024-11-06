import { getRequestUserInfo } from "../../Helpers/restClient";
import { utils } from "../../Helpers/utils";

export const menuItems = (homeOption) => {
  const view = [
    {
      label: "Inicio",
      icon: "pi pi-home",
      command: homeOption,
    },
    {
      label: "Politicas de Privacidad",
      icon: "pi pi-shield",
    },
    {
      label: "Contactenos",
      icon: "pi pi-phone",
    },
  ];

  return view;
};
