import React from "react";
import { HeaderStyled } from "./styled";

const Header = ({
  homeOption,
  politicalOption,
  contactenosOption,
  loginOption,
}) => {
  return (
    <HeaderStyled>
      <div className="container">
        <div className="option-menu" onClick={homeOption}>
          Inicio
        </div>
        <div className="option-menu" onClick={politicalOption}>
          Politicas de Privacidad
        </div>
        <div className="option-menu" onClick={contactenosOption}>
          Contactenos
        </div>
        <div className="option-sesion" onClick={loginOption}>
          Iniciar Sesión
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
