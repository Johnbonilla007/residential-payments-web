import styled from "styled-components";

export const UsersStyled = styled.div`
  margin: 10px;
  min-height: 70vh;
  .container {
    display: grid;
    grid-template-rows: auto auto;
    .commandbox {
      margin-right: 30px;
    }
    .calendar {
      margin-right: 30px;
    }
    .table {
      width: 100%;
      border: 1px solid #000;
      border-radius: 15px;
      padding: 5px;
    }
    .options {
      display: grid;
      grid-template-columns: 20% 50%;
      grid-template-rows: 70px;
      align-items: center;
    }
    .buttonPDF {
      background-color: "#77dd77";
    }
  }
`;
