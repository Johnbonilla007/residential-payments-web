import styled from "styled-components";

export const DefaultLayoutStyled = styled.div`
  margin: 0;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  text-align: center;
  .p-menubar {
    box-shadow: 0px 0px 4px #000000;
    margin: 5px;
  }
  .footer {
    justify-content: flex-end;
    background-color: #4cad4c;
    width: 100%;
    color: #fff;
    font-weight: bold;
  }
  .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link .p-menuitem-text{
    color:#fff;
  }
  .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link .p-menuitem-icon{
    color:#fff;
  }

  .p-menubar.p-menubar-mobile-active .p-menubar-root-list{
    background-color: #4cad4c;
  }
`;
