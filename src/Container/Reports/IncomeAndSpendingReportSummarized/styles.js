import styled from "styled-components";

export const IncomeAndSpendingReportSummarizedStyled = styled.div`
  .filters {
    display: flex;
    gap: 30px;
  }

  .tables {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: space-around;
    gap: 30px;
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
    width: 300px;
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
