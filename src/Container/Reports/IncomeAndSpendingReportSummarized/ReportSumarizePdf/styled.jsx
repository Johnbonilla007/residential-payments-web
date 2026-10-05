import styled from "styled-components";

export const ReportSumarizePdfStyled = styled.div`
  @media print {
    @page {
      size: letter portrait;
      margin: 0.8cm 0.6cm;
    }
  }
  width: 100%;
  margin: 0;
  font-size: 8pt;
  .container-header {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 2px solid #002147;
  }

  .header-logo {
    width: 80px;
    height: auto;
    max-height: 70px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .header-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .header-residential-name {
    font-size: 13pt;
    font-weight: 700;
    color: #002147;
    line-height: 1.2;
  }

  .header-department {
    font-size: 9pt;
    color: #555;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .date-range {
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    width: 100%;
    margin-top: 5px;
    gap: 12px;
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
      font-size: 10pt;
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
        font-size: 7.5pt; /* Reducir ligeramente */
        padding: 3px 4px;
        grid-template-columns: 30% 50% 20%;
        border-top: 1px solid ${(props) => props.theme.colors.border || "#000"};
        color: ${(props) => props.theme.colors.text || "#000"};
        text-align: left;
        page-break-inside: avoid; /* Evitar partir una fila */
        break-inside: avoid;
      }
      .total {
        display: grid;
        font-size: 9pt;
        grid-template-columns: 60% 20% 20%;
        justify-content: center;
        align-items: center;
        padding: 4px;
        border-top: 2px solid ${(props) => props.theme.colors.border || "#000"};
        color: ${(props) => props.theme.colors.text || "#000"};
        page-break-inside: avoid;
        break-inside: avoid;
        /* Evita que el salto de página ocurra justo antes de esta fila,
           dejándola huérfana sola en la página siguiente. */
        page-break-before: avoid;
        break-before: avoid;
      }
    }
  }

  /* Tres tarjetas agrupadas por tema (Ingresos/Gastos/Disponible) en vez de
     11 cajitas sueltas sin relación visual entre sí. */
  .summary-cards {
    display: flex;
    gap: 8px;
    margin: 6px 0;
    width: 100%;
    align-items: stretch;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .summary-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 5px 8px;
    background-color: ${(props) => props.theme.colors.cardBg || "#f9f9f9"};
    border: 1px solid ${(props) => props.theme.colors.border || "#ccc"};
    border-radius: 4px;
  }

  .summary-card-title {
    font-size: 8pt;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-bottom: 1px solid ${(props) => props.theme.colors.border || "#ccc"};
    padding-bottom: 3px;
    margin-bottom: 3px;
    color: ${(props) => props.theme.colors.text || "#333"};
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    gap: 6px;
    padding: 1.5px 0;
    font-size: 7pt;
    color: ${(props) => props.theme.colors.text || "#333"};

    .label {
      color: ${(props) => props.theme.colors.textSecondary || "#555"};
    }

    .value {
      font-weight: 600;
      white-space: nowrap;
    }
  }

  .summary-row.total {
    border-top: 1.5px solid ${(props) => props.theme.colors.border || "#999"};
    margin-top: 2px;
    padding-top: 3px;
    font-size: 8pt;

    .label,
    .value {
      font-weight: 800;
    }
  }

  .value.positive {
    color: green;
  }

  .value.negative {
    color: red;
  }

  /* Overrides para impresión: forzar estilo papel limpio, sin importar el
     tema (claro/oscuro) activo en pantalla al momento de imprimir. */
  @media print {
    .summary-card {
      background-color: #fff !important;
      border: 1px solid #ccc !important;
      -webkit-print-color-adjust: exact;
    }
    .summary-card-title {
      color: #000 !important;
      border-bottom-color: #ccc !important;
    }
    .summary-row {
      color: #000 !important;
    }
    .summary-row .label {
      color: #555 !important;
    }
    .summary-row.total {
      border-top-color: #999 !important;
    }
    .value.positive {
      color: green !important;
    }
    .value.negative {
      color: red !important;
    }
    .table .item-container .item,
    .table .item-container .total {
      color: #000 !important;
      border-color: #000 !important;
    }
    .table {
      border-color: #ccc !important;
    }

    /* Flexbox no reparte bien columnas de alturas muy distintas entre páginas
       (Ingresos suele ser corto, Gastos puede tener muchas filas): el motor de
       impresión deja un hueco enorme al saltar de página. Apilar en vez de
       lado a lado deja que cada tabla fluya sola, de corrido. */
    .date-range {
      flex-direction: column;
      align-items: stretch;
    }
    .table {
      width: 100%;
    }
  }
`;
