import React from "react";
import { CardMenuStyled } from "./styled";
import { useNavigate } from "react-router-dom";

const CardMenu = ({ label, color, icon, path }) => {
  const navigate = useNavigate();

  const onClickNavigate = () => {
    navigate(path);
  };

  const getFontSize = (label) => {
    if (label.length < 10) {
      return 18;
    } else if (label.length >= 10 && label.length <= 20) {
      return 16;
    } else {
      return 14;
    }
  };

  const fontSize = getFontSize(label);

  return (
    <CardMenuStyled color={color}>
      <div className="card" onClick={onClickNavigate}>
        <div className="icon">{icon && icon}</div>
        <div className="content-card">
          <label style={{ fontSize: `${fontSize}pt` }}>{label}</label>
        </div>
      </div>
    </CardMenuStyled>
  );
};

export default CardMenu;
