import { useEffect, useMemo, useRef, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import routes from "../../Routes";
import { Menubar } from "primereact/menubar";
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
import { setShowMenuOnMobile, setShowSideBar } from "./reducer";

export const DefaultLayout = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false); // State for mobile sidebar visibility
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
      let accesses = userInfo.accesses;
      return accesses;
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
      const isResidenceRol = response.user.accesses.any(
        (x) => x.rolName === TipoCuentas.Rol_Residente,
      );
      if (isResidenceRol) {
        navigate("/billing/receipt");
        return;
      }
      navigate("/dashboard");
      return;
    }
    if (response && response.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }
  };

  const handelOnLogOut = (e) => {
    setIsLogin(false);
    dispacth(setAuthenticate(false));
    window.sessionStorage.setItem("userInfo", JSON.stringify({}));
    navigate("/home");
  };

  const homeOption = () => {
    if (isResidenceRol) {
      navigate("/billing/receipt");
      return;
    }
    navigate("/dashboard");
  };

  const start = (
    <div
      className="header-brand"
      onClick={homeOption}
      style={{ cursor: "pointer" }}
    >
      <div className="app-icon">
        <img
          src={require("../../Assets/Logo.png")}
          alt="Quintas del Sol"
          className="logo-img"
          onClick={(e) => {
            e.stopPropagation();
            if (showMenuOnMobile) {
              dispacth(setShowMenuOnMobile(false));
              dispacth(setShowSideBar(false));
            } else {
              dispacth(setShowMenuOnMobile(true));
            }

            setMobileSidebarVisible(!mobileSidebarVisible);
          }}
        />
      </div>
      {authenticate && (
        <div className="system-title">
          <span className="title-main">Residencial</span>
          <span className="title-sub">Quintas del Sol</span>
        </div>
      )}
    </div>
  );

  const end = authenticate && (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ThemeToggle />
      <Button
        label="Cerrar Sesión"
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
      authenticate={authenticate}
      showSideBar={showSideBar}
      showMenuOnMobile={showMenuOnMobile}
    >
      <Toast ref={toast} />

      <Menubar
        style={{ borderRadius: 1 }}
        className="top-bar"
        start={start}
        end={end}
      />

      {authenticate && (
        <AppSidebar
          mobileSidebarVisible={mobileSidebarVisible}
          setMobileSidebarVisible={setMobileSidebarVisible}
        />
      )}

      <div
        style={{
          paddingTop: authenticate ? "80px" : "0",
          flex: 1,
          width: "100%",
        }}
      >
        {RenderRoutes()}
      </div>

      {/* <div className="footer">
        © 2024, Sistema de Pagos Residenciales. Todos los derechos reservados.
      </div> */}
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
