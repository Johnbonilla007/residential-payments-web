import styled from "styled-components";

export const ReportSumarizePdfStyled = styled.div`
  @media print {
    @page {
      size: landscape;
    }
  }
  width: 96%;
  margin: 20px;
  .container-header {
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    width: 100%;
  }

  .date-range {
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
  }
  .table {
    border: 2px solid #ccc;
    width: 48%;
    align-self: self-start;
    .header-title {
      width: 100%;
      font-size: 14pt;
    }
    .header-item {
      display: grid;
      font-size: 12pt;
      grid-template-columns: 30% 50% 20%;
      background-color: #002147;
      width: 100%;
      text-align: left;
      div {
        color: #fff;
      }
    }
    .item-container {
      .item {
        display: grid;
        font-size: 10pt;
        grid-template-columns: 30% 50% 20%;
        border-top: 1px solid #000;
        text-align: left;
      }
      .total {
        display: grid;
        font-size: 11pt;
        grid-template-columns: 60% 20% 20%;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-top: 2px solid #000;
      }
    }
  }

  .table-summarize-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .table-summarize {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    .section-container {
      display: flex;
      gap: 10px;
    }
  }

  .table-summarize .item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  .title {
    font-weight: bold;
    color: #333;
    width: 250px;
  }

  .total {
    font-weight: bold;
    font-size: 1.1rem;
  }

  .total.positive {
    color: green;
  }

  .total.negative {
    color: red;
  }

  .total.difference {
    font-weight: bold;
    padding: 5px;
    border-radius: 8px;
    background-color: #e0ffe0; /* Por defecto verde claro */
  }

  .total.difference.negative {
    background-color: #ffe0e0; /* Rojo claro si la diferencia es negativa */
  }

  .table-available {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .table-available .item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color: #f1f1f1;
    border: 1px solid #bbb;
    border-radius: 8px;
    font-size: 1.3rem;
  }

  .table-available .total {
    color: #005aa0; /* Color especial para el disponible del mes */
  }
`;
