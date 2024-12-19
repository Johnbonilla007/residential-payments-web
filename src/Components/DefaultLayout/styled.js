import styled from "styled-components";

export const DefaultLayoutStyled = styled.div`
  margin: 0;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  text-align: center;
  overflow: hidden;

  /* La barra superior */
  .top-bar {
    ${({ authenticate, showSideBar, showMenuOnMobile }) =>
      authenticate &&
      `position: absolute; top: 0;
       right: 0;
       left: ${showSideBar ? "200px" : showMenuOnMobile ? "70px" : "0"};`}

    transition: left 0.3s ease, color 0.3s ease; /* Transición para el movimiento de izquierda a derecha */

    .p-menubar {
      box-shadow: 0px 0px 1px #000000;
      border-radius: 1px;
    }

    background: #002147;
    border: none;

    .app-icon {
      margin-right: 16px;
      padding: 8px 12px; /* Espacio interno para el texto */
      background-color: transparent; /* Fondo blanco para que contraste */
      color: #002147; /* Color de texto acorde al tema */
      font-weight: bold;
      font-size: 1.2em;
      border-radius: 4px; /* Opcional: esquinas redondeadas */
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase; /* Para darle un toque profesional */

      /* Sombras y bordes para destacar */
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .p-menubar {
      box-shadow: 0px 0px 1px #000000;
      border-radius: 1px;
      flex-grow: 1;
    }

    /* Estilo para dispositivos móviles */
    @media (max-width: 768px) {
      position: fixed; /* Para que la barra se quede fija en la parte superior */
      left: 0; /* Aseguramos que esté alineada a la izquierda */
      top: 0; /* Queda en la parte superior */
      width: 100%; /* Asegura que ocupe todo el ancho en móvil */
      z-index: 9999; /* Para que esté por encima de otros elementos */
    }
  }

  .footer {
    justify-content: flex-end;
    background-color: #002147;
    width: 100%;
    color: #fff;
    font-weight: bold;
  }

  /* Menú */
  .p-menubar
    .p-menubar-root-list
    > .p-menuitem
    > .p-menuitem-link
    .p-menuitem-text {
    color: #fff;
  }

  .p-menubar
    .p-menubar-root-list
    > .p-menuitem
    > .p-menuitem-link
    .p-menuitem-icon {
    color: #fff;
  }

  .p-menubar.p-menubar-mobile-active .p-menubar-root-list {
    background-color: #002147;
  }
`;

export const AppSidebarStyled = styled.div`
  .side {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    transition: left 0.4s ease-in-out;
    width: 200px;
    background-color: #001f3f;
    height: 100%;

    /* Responsive styling for smaller screens */
    @media only screen and (max-width: 600px) {
      position: fixed;
      z-index: 9999;
      width: 80%;
      height: 100%;
      left: ${(props) => (props.mobileSidebarVisible ? "0px" : "-100%")};
      top: ${(props) => (props.mobileSidebarVisible ? "67px" : "-100%")};
      transition: left 0.3s ease-in-out;
    }
  }

  .css-156uyio {
    border-color: gray;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  }

  /* Main menu item styles */
  .side .menuItem {
    color: #d0e4f4;
    transition: color 0.3s ease, background-color 0.3s ease;

    &:hover {
      background-color: #13395e;
      color: #ffffff;
    }

    &.active {
      background-color: #13395e;
      color: #ffffff;
      font-weight: bold;
      border-left: 4px solid #ffffff;
    }
  }

  .side .submenu {
    /* background-color: #002b4d;  */
    /* padding-left: 10px;  */
    text-align: left;

    .ps-submenu-content {
      background-color: lightgray;

      span {
        color: black;
      }

      :hover {
        background-color: lightgray;

        span {
          /* color: white; */
        }
      }
    }
  }

  .side .submenuItem {
    color: #c2d6e3;
    transition: color 0.5s ease, background-color 0.5s ease;

    &:hover {
      background-color: #0f3a5e;
      color: #ffffff;
    }

    &.active {
      background-color: #0f3a5e;
      color: #ffffff;
      font-weight: bold;
      border-left: 3px solid #ffffff;
    }
  }

  .show-and-unshown-menu-item {
    svg {
      font-size: 20px;
    }
  }
`;
