import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginStyled } from "./styled";
import { Button } from "primereact/button";
import { restClient } from "../../Helpers/restClient";
import { useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { setAuthenticate } from "./reducer";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const toast = useRef(null);

  const handelOnLogin = async () => {
    const request = {
      userName: userName,
      password: password,
    };
    ;
    const response = await restClient.httpPost(
      "/security/users/authentica-user",
      request
    );

    if (response && response.success) {
      dispacth(setAuthenticate(true));
      setUserName("");
      setPassword("");
      window.sessionStorage.setItem("userInfo", JSON.stringify(response.user));
      navigate("/menuu");
      return;
    }
    if (response && !response.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }

    if (!response) {
      toast.current.show({
        severity: "error",
        summary: "Advertencia",
        detail: "Error de servicio",
        life: 3000,
      });
    }
  };

  return (
    <LoginStyled>
      <Toast ref={toast} />
      <div className="container">
        <div className="login-box">
          <div className="logo">
            <img
              alt="logo"
              src={require("../../Assets/Logo-SSA.png")}
              height="120"
            ></img>
          </div>
          <div className="input">
            <InputText
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Usuario"
            />
          </div>
          <div className="input">
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              feedback={false}
            />
          </div>

          <Button
            label="Iniciar Sesión"
            className="p-button-raised p-button-info"
            onClick={async () => await handelOnLogin()}
          />
        </div>
      </div>
    </LoginStyled>
  );
};
