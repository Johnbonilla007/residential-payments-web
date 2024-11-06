import React, { useEffect, useRef, useState } from "react";
import routes from "../../Routes";
import CardMenu from "../Menu/Components/CardMenu";
import { utils } from "../../Helpers/utils";
import { UsersContainerStyled } from "./Styled";

const UsersContainer = () => {
  const _routes = routes.firstOrDefault((x) => x.module === "Usuarios");

  return (
    <UsersContainerStyled>
      {_routes?.subRoutes?.map((route, index) => {
        const allowAccess = utils.hasPermission(route.accesses);
        
        if (allowAccess) {
          return (
            <CardMenu
              key={index}
              label={route.name}
              color={route.color}
              icon={route.icon}
              path={route.path}
            />
          );
        }
      })}
    </UsersContainerStyled>
  );
};

export default UsersContainer;
