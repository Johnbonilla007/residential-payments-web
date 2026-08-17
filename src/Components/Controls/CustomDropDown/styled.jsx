import styled from "styled-components";

export const CustomDropDownStyled = styled.div`
  position: relative;
  width: 100%;

  .custom-dropdown input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    background: ${(props) => props.theme.colors.cardBg};
    border: 1px solid ${(props) => props.theme.colors.border};
    z-index: 1000;
  }

  .dropdown-item:hover {
    background-color: ${(props) => props.theme.colors.surfaceHighlight};
    color: ${(props) => props.theme.colors.text};
  }
`;
