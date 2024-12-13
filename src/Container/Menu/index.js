import React from "react";
import { MenuStyled } from "./styled";
import routes from "../../Routes";
import { useMemo } from "react";
import { utils } from "../../Helpers/utils";
import CardMenu from "./Components/CardMenu";
import { getRequestUserInfo } from "../../Helpers/restClient";
import Container from "../../Components/ContainerControl";

const DashboardMenu = () => {
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
      <MenuStyled>
        <div className="container-menu">
          {routes.map((route, index) => {
            const AllowView = accesses?.some(
              (x) =>
                x.rolName === route.accesses ||
                x?.permissions?.some((y) => y.name === "SuperRoot")
            );

            if (AllowView)
              return (
                <CardMenu
                  key={index}
                  label={route.name}
                  color={route.color}
                  icon={route.icon}
                  path={route.path}
                />
              );

            return null;
          })}
        </div>
      </MenuStyled>
    </Container>
  );
};

export default DashboardMenu;
