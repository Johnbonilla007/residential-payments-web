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

  const isSuperRoot = accesses?.some((x) =>
    x?.permissions?.some((y) => y.name === "SuperRoot")
  );

  const primaryAccount = userInfo?.accounts?.[0];
  const displayName =
    primaryAccount?.fullName ||
    [primaryAccount?.firstName, primaryAccount?.lastName]
      .filter(Boolean)
      .join(" ") ||
    userInfo?.fullName ||
    userInfo?.name ||
    userInfo?.userName ||
    "Bienvenido";

  const formattedDate = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(new Date());
    } catch {
      return "";
    }
  }, []);

  return (
    <Container>
      <MenuStyled>
        <div className="menu-wrapper">
          <div className="dashboard-hero">
            <div className="hero-text">
              <h2 className="hero-title">Hola, {displayName}</h2>
              <p className="hero-subtitle">
                Selecciona un módulo o accede directo a una sección
              </p>
            </div>
            {formattedDate && (
              <span className="hero-date">{formattedDate}</span>
            )}
          </div>

          <div className="container-menu">
            {routes.map((route, index) => {
              const AllowView =
                isSuperRoot ||
                accesses?.some((x) => x.rolName === route.accesses);

              if (!AllowView) return null;

              const allowedSubRoutes = utils.evaluateArray(route.subRoutes)
                ? route.subRoutes.filter(
                    (subRoute) =>
                      isSuperRoot ||
                      accesses?.some(
                        (x) =>
                          x.rolName === subRoute.accesses ||
                          x?.permissions?.some(
                            (y) => y.name === subRoute.accesses
                          )
                      )
                  )
                : [];

              return (
                <CardMenu
                  key={route.path || index}
                  label={route.name}
                  description={route.description}
                  color={route.color}
                  icon={route.icon}
                  path={route.path}
                  subRoutes={allowedSubRoutes}
                />
              );
            })}
          </div>
        </div>
      </MenuStyled>
    </Container>
  );
};

export default DashboardMenu;
