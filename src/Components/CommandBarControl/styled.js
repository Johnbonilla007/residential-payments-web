import styled from "styled-components";

export const CommandBarControlStyled = styled.div`
  position: sticky;
  top: 0;
  background-color: #f8f9fa;
  color: white;
  padding: 6px;
  display: flex;
  z-index: 1000;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  /* position: absolute;
  left: ${({ showSideBar }) => showSideBar && "70px"}; */
  transition: left 0.10s ease, color 0.10s ease;

  .command-button-disabled {
    opacity: 0.5; /* Reduce la opacidad para dar efecto de deshabilitado */
    pointer-events: none; /* Evita cualquier interacción */
    background: none;
    border: none;
    color: #000;
    height: 30px;
    width: 185px;
    cursor: pointer;
    font-size: 12px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    display: flex;
    justify-content: left;
    align-items: center;
    .icon {
      border-right: 1px solid #ccc;
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title {
      /* background-color: red; */
      width: 100%;
      font-size: 10pt;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
  }
  .command-button {
    background: none;
    border: none;
    color: #000;
    height: 30px;
    width: 185px;
    cursor: pointer;
    font-size: 12px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    display: flex;
    justify-content: left;
    align-items: center;
    .icon {
      border-right: 1px solid #ccc;
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title {
      /* background-color: red; */
      width: 100%;
      font-size: 10pt;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
  }

  .command-button:hover {
    background-color: #ccc;
    .icon {
      border-right: 1px solid #7a7b7d;
    }
  }
`;
