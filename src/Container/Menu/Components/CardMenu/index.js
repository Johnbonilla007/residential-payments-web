import React from "react";
import { CardMenuStyled } from "./styled";
import { useNavigate } from "react-router-dom";

const CardMenu = ({ label, color, icon, path }) => {
  const navigate = useNavigate();
  const Wave = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 1400 280"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        fillOpacity="1"
        d="M 0 160 L 80 170.7 C 160 181 320 203 480 181.3 C 640 160 800 96 960 101.3 C 1120 107 1280 181 1360 218.7 L 1440 244 C 1442 257 1443 258 1438 258 C 1340 264 172 254 31 254 C -5 251 1 232 0 224 Z"
      />
    </svg>
  );
  const onClickNavite = () => {
    navigate(path);
  };
  const getFontSize = (label) => {
    if (label.length < 10) {
      return 18;
    } else if (label.length >= 10 && label.length <= 20) {
      return 16;
    } else {
      return 12;
    }
  };

  const fontSize = getFontSize(label);
  return (
    <CardMenuStyled color={color}>
      <div className="card" onClick={() => onClickNavite()}>
        <div className="icon">{icon && icon}</div>
        <div className="content">
          <label style={{ fontSize: `${fontSize}pt` }}>{label}</label>
        </div>
        <div style={{ marginBottom: "-10px" }}>
          <Wave className="wave green" />
        </div>
      </div>
    </CardMenuStyled>
  );
};

export default CardMenu;
