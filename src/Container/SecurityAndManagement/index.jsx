import React, { useMemo } from "react";
import routes from "../../Routes";
import CardMenu from "../Menu/Components/CardMenu";
import { utils } from "../../Helpers/utils";
import { getRequestUserInfo } from "../../Helpers/restClient";
import Container from "../../Components/ContainerControl";
import { SecurityContainerStyled } from "./styles";

const SecurityAndManagementContainer = () => {
  const _routes = routes.firstOrDefault(
    (x) => x.module === "security-and-management"
  );
  const userInfo = getRequestUserInfo();
  const accesses = useMemo(() => {
    if (utils.evaluateFullObjetct(userInfo)) {
      let accesses = userInfo.accesses;
      return accesses;
    }
    return [];
  }, [userInfo]);
  return (
    <Container>
      <SecurityContainerStyled>
        {_routes?.subRoutes?.map((route, index) => {
          let allowAccess = utils.hasPermission(route.accesses);
          const isSuperRoot = accesses?.some((x) =>
            x?.permissions?.some((y) => y.name === "SuperRoot")
          );

          if (!allowAccess && isSuperRoot) {
            allowAccess = true;
          }
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
      </SecurityContainerStyled>
    </Container>
  );
};

export default SecurityAndManagementContainer;
