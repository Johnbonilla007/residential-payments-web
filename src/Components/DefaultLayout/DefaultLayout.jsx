import { useEffect, useMemo, useRef, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import routes from "../../Routes";
import { Button } from "primereact/button";
import { DefaultLayoutStyled } from "./styled";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import Home from "../../Container/Home";
import { getRequestUserInfo, restClient } from "../../Helpers/restClient";
import { utils } from "../../Helpers/utils";
import { Login } from "../../Container/Login";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticate, setUserInfo } from "../../Container/Login/reducer";
import { Toast } from "primereact/toast";
import { ThemeToggle } from "../ThemeToggle";
import DashboardMenu from "../../Container/Menu";
import AppSidebar from "./AppSideBar";
import { TipoCuentas } from "../../Helpers/Constant";
import { useIsMobile } from "../../Helpers/useIsMobile";

const resolveRouteTitle = (pathname) => {
  if (!pathname || pathname === "/dashboard") return "Dashboard";
  if (pathname === "/home") return "Inicio";
  if (pathname === "/login") return "Iniciar Sesión";

  for (const route of routes) {
    if (route.path === pathname) return route.name;
    if (Array.isArray(route.subRoutes)) {
      const sub = route.subRoutes.find((s) => s.path === pathname);
      if (sub) return sub.name;
    }
  }
  return "Residencial";
};

const getInitials = (name) => {
  if (!name) return "QS";
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
};

export const DefaultLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [, setIsLogin] = useState(false);
  const dispacth = useDispatch();
  const op = useRef(null);
  const userInfo = getRequestUserInfo();

  const toast = useRef(null);

  const { authenticate } = useSelector((state) => state.Login);
  const { showSideBar, showMenuOnMobile } = useSelector(
    (state) => state.DefaultLayout,
  );

  useEffect(() => {
    if (authenticate) {
      if (utils.evaluateFullObjetct(userInfo)) {
        homeOption();
        setIsLogin(true);
        return;
      }
    }
    navigate("/login");
    dispacth(setAuthenticate(false));
    window.sessionStorage.setItem("userInfo", JSON.stringify({}));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticate]);

  const accesses = useMemo(() => {
    if (utils.evaluateFullObjetct(userInfo)) {
      return userInfo.accesses;
    }
    return [];
  }, [userInfo]);

  const isResidenceRol = useMemo(() => {
    return userInfo?.accesses?.any(
      (x) => x.rolName === TipoCuentas.Rol_Residente,
    );
  }, [userInfo]);

  const handelOnLogin = async (e) => {
    const request = {
      userName: userName,
      password: password,
    };

    const response = await restClient.httpPost(
      "/security/users/authentica-user",
      request,
    );

    if (response && response.success) {
      op.current.toggle(!e);
      dispacth(setAuthenticate(true));
      setUserName("");
      setPassword("");
      setIsLogin(true);
      window.sessionStorage.setItem("userInfo", JSON.stringify(response.user));
      const residenceRole = response.user.accesses.any(
        (x) => x.rolName === TipoCuentas.Rol_Residente,
      );
      if (residenceRole) {
        navigate("/billing/receipt");
        return;
      }
      navigate("/dashboard");
      return;
    }
  };

  const homeOption = () => {
    if (isResidenceRol) {
      navigate("/billing/receipt");
      return;
    }
    navigate("/dashboard");
  };

  const currentRouteTitle = useMemo(
    () => resolveRouteTitle(location.pathname),
    [location.pathname],
  );

  const canGoBackOnMobile =
    authenticate &&
    isMobile &&
    !["/", "/login", "/dashboard", "/home"].includes(location.pathname);

  const handleMobileBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    homeOption();
  };

  const userInitials = useMemo(
    () => getInitials(userInfo?.fullName || userInfo?.userName),
    [userInfo],
  );

  const RenderRoutes = () => (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route key={"/login"} path={"/login"} element={<Login />} />
      <Route key={"/home"} path={"/home"} element={<Home />} />
      <Route
        key={"/dashboard"}
        path={"/dashboard"}
        element={<DashboardMenu />}
      />
      {routes.map((route) => {
        const allowView = accesses?.some(
          (x) =>
            x.rolName === route.accesses ||
            x?.permissions?.some((y) => y.name === "SuperRoot"),
        );

        let hasSubRoutes = route.subRoutes !== undefined;

        if (hasSubRoutes && allowView) {
          return (
            <>
              <Route
                key={route.path}
                path={route.path}
                element={route.Element}
              />
              {route.subRoutes.map((subRoute) => {
                let allowAccess = utils.hasPermission(subRoute.accesses);
                const isSuperRoot = accesses?.some((x) =>
                  x?.permissions?.some((y) => y.name === "SuperRoot"),
                );

                if (!allowAccess && isSuperRoot) {
                  allowAccess = true;
                }

                if (allowAccess) {
                  return (
                    <Route
                      key={subRoute.path}
                      path={subRoute.path}
                      element={subRoute.Element}
                    />
                  );
                }

                return null;
              })}
            </>
          );
        }

        if (allowView)
          return (
            <Route key={route.path} path={route.path} element={route.Element} />
          );

        return null;
      })}
    </Routes>
  );

  return (
    <DefaultLayoutStyled
      $authenticate={authenticate}
      $showSideBar={showSideBar}
      $showMenuOnMobile={showMenuOnMobile}
    >
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <Toast ref={toast} />

      {authenticate && (
        <>
          <header className="top-bar">
            <div className="header-left">
              {canGoBackOnMobile && (
                <button
                  type="button"
                  className="mobile-back-btn"
                  aria-label="Volver"
                  onClick={handleMobileBack}
                >
                  <i className="pi pi-arrow-left" aria-hidden="true" />
                </button>
              )}
              <span
                className="user-avatar-badge"
                title={userInfo?.fullName || userInfo?.userName || "Usuario"}
              >
                {userInitials}
              </span>
            </div>

            <div className="header-center">
              <h1 className="page-title" title={currentRouteTitle}>
                {currentRouteTitle}
              </h1>
            </div>

            <div className="header-right">
              <ThemeToggle />
              <Button
                type="button"
                label={isMobile ? undefined : "Cerrar Sesión"}
                aria-label="Cerrar sesión"
                icon="pi pi-sign-out"
                className="p-button-danger logout-btn"
                onClick={() => {
                  dispacth(setAuthenticate(false));
                  dispacth(setUserInfo({}));
                  window.sessionStorage.setItem("userInfo", JSON.stringify({}));
                  navigate("/login");
                }}
              />
            </div>
          </header>

          <AppSidebar />
        </>
      )}

      <main
        id="main-content"
        className="main-content"
        tabIndex={-1}
        style={{
          paddingTop: authenticate
            ? isMobile
              ? "var(--mobile-header-h, 60px)"
              : "60px"
            : "0",
          flex: 1,
        }}
      >
        {RenderRoutes()}
      </main>

      <OverlayPanel
        ref={op}
        showCloseIcon
        id="overlay_panel"
        style={{ width: "450px" }}
        className="overlaypanel-demo"
      >
        <div
          style={{
            justifyContent: "center",
            display: "grid",
            gridTemplateColumns: "60% 40%",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              display: "grid",
              gridTemplateRows: "60% 60%",
            }}
          >
            <span>
              <InputText
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Usuario"
              />
            </span>
            <span>
              <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                feedback={false}
              />
            </span>
          </div>
          <div style={{ alignContent: "center", display: "grid" }}>
            <Button
              type="button"
              label="Iniciar"
              onClick={(e) => handelOnLogin(e)}
              className="p-button-rounded p-button-info"
            />
          </div>
        </div>
      </OverlayPanel>
    </DefaultLayoutStyled>
  );
};
