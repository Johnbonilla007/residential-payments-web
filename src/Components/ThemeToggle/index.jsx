import React from "react";
import styled from "styled-components";
import { useTheme } from "../../Context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleButton = styled.button`
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--app-nav-text) 30%, transparent);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: var(--radius-full);
  color: var(--app-nav-text);
  transition: background var(--transition-base), transform var(--transition-base);
  margin-right: 15px;

  &:hover {
    background: color-mix(in srgb, var(--app-nav-text) 15%, transparent);
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
      title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </ToggleButton>
  );
};
