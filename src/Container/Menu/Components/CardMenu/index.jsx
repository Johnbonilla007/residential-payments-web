import React from "react";
import { CardMenuStyled } from "./styled";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const CardMenu = ({ label, description, color, icon, path }) => {
  const navigate = useNavigate();

  const onClickNavigate = () => {
    navigate(path);
  };

  return (
    <CardMenuStyled color={color}>
      <button type="button" className="card" onClick={onClickNavigate}>
        <div className="left-content">
          <div className="icon" aria-hidden="true">
            {icon && icon}
          </div>
          <div className="text-content">
            <h3 className="title">{label}</h3>
            {description && <p className="description">{description}</p>}
          </div>
        </div>
        <FaChevronRight className="chevron-shift" aria-hidden="true" />
        <div className="glow-background" />
      </button>
    </CardMenuStyled>
  );
};

export default CardMenu;
