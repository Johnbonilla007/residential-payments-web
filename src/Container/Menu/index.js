import React from "react";
import { MenuStyled } from "./styled";
import routes from "../../Routes";
import { useMemo } from "react";
import { utils } from "../../Helpers/utils";
import CardMenu from "./Components/CardMenu";
import { getRequestUserInfo } from "../../Helpers/restClient";

const Menu = () => {
  const userInfo = getRequestUserInfo();
  const permission = useMemo(() => {
    if (utils.evaluateFullObjetct(userInfo)) {
      let accesses = userInfo.accesses;
      return accesses;
    }
    return [];
  }, [userInfo]);

  return (
    <MenuStyled>
      <div className="container-menu">
        {routes.map((route, index) => {
          const AllowView = permission?.some(
            (x) => x.rolName === route.accesses
          );
          if (AllowView)
            return (
              <div key={index} style={{ margin: "10px" }}>
                <CardMenu
                  label={route.name}
                  color={route.color}
                  icon={route.icon}
                  path={route.path}
                />
              </div>
            );

          return null;
        })}
      </div>
    </MenuStyled>
  );
};

export default Menu;
