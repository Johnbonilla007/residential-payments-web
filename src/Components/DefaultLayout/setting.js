import { getRequestUserInfo } from "../../Helpers/restClient";
import { utils } from "../../Helpers/utils";

export const menuItems = (homeOption) => {
  const view = [
    {
      label: "Inicio",
      icon: "pi pi-home",
      command: homeOption,
    },
  ];

  return view;
};
