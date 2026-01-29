import styled from "styled-components";

export const CustomDropdownStyled = styled.div`
  position: relative;
  width: 100%;

  .custom-dropdown input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }

  /* LISTA DESPLEGABLE */
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    background: ${(props) => props.theme.colors.cardBg || "white"};
    border: 1px solid ${(props) => props.theme.colors.border || "#ccc"};
    z-index: 1000;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 0 0 6px 6px;
  }

  .dropdown-item {
    color: ${(props) => props.theme.colors.text || "#333"};
    transition: background-color 0.2s;
  }

  .dropdown-item:hover {
    background-color: ${(props) => props.theme.colors.hoverBg || "#f1f1f1"};
    cursor: pointer;
  }
`;
