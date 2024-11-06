import styled from "styled-components";

export const ReportDetailPdfStyled = styled.div`
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
    width: 100%;
    align-self: self-start;
    .header-title {
      width: 100%;
      font-size: 14pt;
    }
    .header-item {
      display: grid;
      font-size: 12pt;
      grid-template-columns: ${(props) =>
        props.isIncoming ? "10% 15% 20% 10% 20% 15% 10%" : "15% 35% 35% 15% "};
      background-color: #4cad4c;
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
        grid-template-columns: ${(props) =>
          props.isIncoming ? "10% 15% 20% 10% 20% 15% 10%" : "15% 35% 35% 15%"};
        border-top: 1px solid #000;
        text-align: left;
      }
      .total {
        display: grid;
        font-size: 11pt;
        grid-template-columns: 80% 10% 10%;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-top: 2px solid #000;
      }
    }
  }

  .table-summarize {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
    border: 2px solid #eee;
    border-radius: 10px;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    div {
      padding-left: 2px;
    }
  }

  .item:last-child {
    border-bottom: none;
  }

  .title {
    font-weight: bold;
    color: #333;
  }

  .total {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
  }

  .positive {
    color: #28a745; /* Verde */
  }

  .negative {
    color: #dc3545; /* Rojo */
  }

  .difference {
    padding: 5px 10px;
    border-radius: 5px;
    color: #333;
  }
`;
