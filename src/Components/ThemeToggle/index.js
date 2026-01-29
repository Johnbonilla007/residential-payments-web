import React from "react";
import styled from "styled-components";
import { useTheme } from "../../Context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
  margin-right: 15px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.1);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </ToggleButton>
  );
};
