import React, { useEffect, useMemo, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import routes from "../../Routes";
import { Menubar } from "primereact/menubar";
import { menuItems } from "./setting";
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
import { setAuthenticate } from "../../Container/Login/reducer";
import { Toast } from "primereact/toast";
import Menu from "../../Container/Menu";
import ReportsContainer from "../../Container/Reports";

export const DefaultLayout = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const dispacth = useDispatch();
  const op = useRef(null);
  const userInfo = getRequestUserInfo();

  const toast = useRef(null);

  const { authenticate } = useSelector((state) => state.Login);

  useEffect(() => {
    
    if (authenticate) {
      
      if (utils.evaluateFullObjetct(userInfo)) {
        homeOption();
        setIsLogin(true);
        return;
      }
    }
    navigate("/");
    dispacth(setAuthenticate(false));
    window.sessionStorage.setItem("userInfo", JSON.stringify({}));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticate]);

  const permission = useMemo(() => {
    if (utils.evaluateFullObjetct(userInfo)) {
      let accesses = userInfo.accesses;
      return accesses;
    }
    return [];
  }, [userInfo]);

  const handelOnLogin = async (e) => {
    const request = {
      userName: userName,
      password: password,
    };

    const response = await restClient.httpPost(
      "/security/users/authentica-user",
      request
    );

    if (response && response.success) {
      op.current.toggle(!e);
      dispacth(setAuthenticate(true));
      setUserName("");
      setPassword("");
      setIsLogin(true);
      window.sessionStorage.setItem("userInfo", JSON.stringify(response.user));
      navigate("/menuu");
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
    navigate("/menuu");
  };

  const start = (
    <img alt="logo" src={require("../../Assets/ssaicon.png")} height="50"></img>
  );
  const end = (
    <Button
      type="button"
      label={authenticate ? "Cerrar Sesión" : "Iniciar Sesión"}
      onClick={(e) => {
        if (authenticate) {
          handelOnLogOut();
          return;
        }
        navigate("/login");
      }}
      aria-haspopup
      aria-controls="overlay_panel"
      className={
        authenticate
          ? "p-button-raised p-button-danger"
          : "p-button-raised p-button-info"
      }
      style={{ marginRight: "30px" }}
    />
  );
  return (
    <DefaultLayoutStyled>
      <Toast ref={toast} />
      <Menubar
        model={menuItems(homeOption)}
        start={start}
        end={end}
        style={{ margin: "0px", backgroundColor: "#4cad4c" }}
      />
      <Routes>
        <Route index element={<Menu />} />
        <Route key={"/login"} path={"/login"} element={<Login />} />
        <Route key={"/home"} path={"/home"} element={<Home />} />
        <Route key={"/menuu"} path={"/menuu"} element={<Menu />} />
        {routes.map((route) => {
          const AllowView = permission?.some(
            (x) => x.rolName === route.accesses
          );
          const hasSubRoutes = route.subRoutes !== undefined;

          if (hasSubRoutes && AllowView) {
            return (
              <>
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.Element}
                />
                {route.subRoutes.map((subRoute) => {
                  const allowAccess = utils.hasPermission(subRoute.accesses);
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

          if (AllowView)
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.Element}
              />
            );

          return null;
        })}
      </Routes>
      <div className="footer">
        © 2022, Sistema de Seguridad Alpha. Todos los derechos reservados.
      </div>
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
