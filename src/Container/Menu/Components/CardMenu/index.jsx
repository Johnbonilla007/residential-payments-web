import React from "react";
import { CardMenuStyled } from "./styled";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const CardMenu = ({ label, description, color, icon, path, subRoutes = [] }) => {
  const navigate = useNavigate();

  const onClickNavigate = () => {
    navigate(path);
  };

  return (
    <CardMenuStyled color={color}>
      <div
        role="button"
        tabIndex={0}
        className="card"
        onClick={onClickNavigate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClickNavigate();
          }
        }}
      >
        <div className="card-top">
          <div className="left-content">
            <div className="icon" aria-hidden="true">
              {icon && icon}
            </div>
            <div className="text-content">
              <h3 className="title">{label}</h3>
              {description && <p className="description">{description}</p>}
            </div>
          </div>
          <span className="chevron-shift" aria-hidden="true">
            <FaChevronRight />
          </span>
        </div>

        {subRoutes.length > 0 && (
          <div className="quick-links">
            {subRoutes.slice(0, 4).map((sub) => (
              <button
                key={sub.path}
                type="button"
                className="quick-chip"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(sub.path);
                }}
              >
                {sub.name}
              </button>
            ))}
            {subRoutes.length > 4 && (
              <span className="quick-more">+{subRoutes.length - 4} más</span>
            )}
          </div>
        )}

        <div className="glow-background" />
      </div>
    </CardMenuStyled>
  );
};

export default CardMenu;
