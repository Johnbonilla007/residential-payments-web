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
    display: grid;
    grid-template-columns: 150px 1fr 150px; /* Logos laterales fijos, titulo flexible */
    align-items: center;
    width: 100%;
    margin-bottom: 20px;

    > div:nth-child(2) {
      text-align: center;
    }
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
    border: 2px solid ${(props) => props.theme.colors.border || "#ccc"};
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
      /* Permitir salto de página dentro del contenedor de items */
      display: block;

      .item {
        display: grid;
        font-size: 9pt; /* Reducir ligeramente */
        grid-template-columns: 30% 50% 20%;
        border-top: 1px solid ${(props) => props.theme.colors.border || "#000"};
        color: ${(props) => props.theme.colors.text || "#000"};
        text-align: left;
        page-break-inside: avoid; /* Evitar partir una fila */
        break-inside: avoid;
      }
      .total {
        display: grid;
        font-size: 11pt;
        grid-template-columns: 60% 20% 20%;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-top: 2px solid ${(props) => props.theme.colors.border || "#000"};
        color: ${(props) => props.theme.colors.text || "#000"};
        page-break-inside: avoid;
        break-inside: avoid;
      }
    }
  }

  .table-summarize {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    width: 100%;
    page-break-inside: avoid; /* Tratar de mantener el resumen junto */
    break-inside: avoid;

    .section-container {
      display: flex;
      gap: 10px;
      width: 100%;
      justify-content: space-around;
      flex-wrap: wrap; /* Permitir wrap si es necesario */
    }
  }

  .table-summarize .item {
    display: flex;
    justify-content: space-between;
    padding: 8px; /* Reducir padding */
    background-color: ${(props) => props.theme.colors.cardBg || "#f9f9f9"};
    border: 1px solid ${(props) => props.theme.colors.border || "#ddd"};
    border-radius: 3px;
    font-size: 9pt; /* Texto más pequeño */
    color: ${(props) => props.theme.colors.text || "#333"};
  }

  .title {
    font-weight: bold;
    color: ${(props) => props.theme.colors.text || "#333"};
    width: auto;
    flex: 1;
    margin-right: 10px;
  }

  .total {
    font-weight: bold;
    font-size: 1rem;
    white-space: nowrap;
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
    color: ${(props) => props.theme.colors.primary || "#005aa0"};
  }

  /* Overrides para impresión: forzar estilo papel limpio */
  @media print {
    .table-summarize .item {
      background-color: #fff !important;
      border: 1px solid #ddd !important;
      color: #000 !important;
      -webkit-print-color-adjust: exact;
    }
    .title {
      color: #000 !important;
    }
    .table .item-container .item,
    .table .item-container .total {
      color: #000 !important;
      border-color: #000 !important;
    }
    .table {
      border-color: #ccc !important;
    }
  }
`;
