import styled from "styled-components";

export const ReportStyled = styled.div`
  padding: 10px;
  min-height: 80vh;
  min-width: 600px;
  .p-column-filter-row .p-column-filter-menu-button,
  .p-column-filter-row .p-column-filter-clear-button {
    display: none;
  }
  .container {
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
      grid-template-columns: 300px 300px 170px 170px;
      grid-template-rows: 70px;
      align-items: center;
    }
    .buttonPDF {
      background-color: "#77dd77";
    }
  }
`;
