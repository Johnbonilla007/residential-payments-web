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
import Container from "../../Components/ContainerControl";
import { utils } from "../../Helpers/utils";
import { TipoCuentas } from "../../Helpers/Constant";
import { setResidentials, setResidentialSelected } from "../Invoice/reducer";
import { AiOutlineLogin } from "react-icons/ai";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const handelOnLogin = async () => {
    const request = {
      userName: userName,
      password: password,
    };
    const response = await restClient.httpPost(
      "/security/users/authentica-user",
      request
    );

    if (response && response.success) {
      dispatch(setAuthenticate(true));
      setUserName("");
      setPassword("");
      window.sessionStorage.setItem("userInfo", JSON.stringify(response.user));
      handleFechtResidential(response.user);
      const isResidenceRol = response.user.accesses.any(
        (x) => x.rolName === TipoCuentas.Rol_Residente
      );
      if (isResidenceRol) {
        navigate("/billing/receipt");
        return;
      }
      navigate("/dashboard");
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

  const handleFechtResidential = async (userInfo) => {
    if (utils.evaluateFullObjetct(userInfo)) {
      const request = {
        searchValue: userInfo.residentialNo,
      };
      const response = await restClient.httpGet(
        "/security/residentials/get-residentials",
        request
      );
      if (response?.success) {
        dispatch(setResidentials([response.residential]));
        dispatch(setResidentialSelected(response.residential));
        document.title = response?.residential?.name;
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handelOnLogin();
    }
  };

  return (
    <Container>
      <LoginStyled>
        <Toast ref={toast} />
        <div className="container">
          <div className="login-box">
            <div className="logo">
              {/* <img
                alt="logo"
                src={require("../../Assets/login.jpeg")}
                height="120"
              ></img> */}
              <AiOutlineLogin size={80}/>
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
                onKeyDown={handleKeyDown}
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
    </Container>
  );
};
