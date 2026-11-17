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
  font-size: 0.85rem;
  color: var(--text-color, #1f2937);

  .container-header {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--app-primary, #002147);
  }

  .header-logo {
    width: 64px;
    height: auto;
    max-height: 60px;
    object-fit: contain;
    flex-shrink: 0;
    border-radius: 6px;
  }

  .header-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    text-align: left;
  }

  .header-residential-name {
    font-size: clamp(1rem, 2.2vw, 1.25rem);
    font-weight: 700;
    color: var(--text-color, #002147);
    line-height: 1.2;
  }

  .header-department {
    font-size: 0.8rem;
    color: var(--text-color-secondary, #555);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .report-title {
    font-size: clamp(0.95rem, 2vw, 1.2rem);
    font-weight: 700;
    text-align: center;
    margin: 8px 0 2px;
    color: var(--text-color, #1f2937);
  }

  .report-subtitle {
    font-size: clamp(0.85rem, 1.8vw, 1.05rem);
    font-weight: 700;
    text-align: center;
    margin-bottom: 12px;
    color: var(--text-color-secondary, #555);
  }

  .date-range {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 8px;
    gap: 14px;

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .table {
    border: 1px solid var(--surface-border, #ccc);
    border-radius: 8px;
    overflow: hidden;
    width: 49%;
    background: var(--surface-card, #fff);

    @media (max-width: 900px) {
      width: 100%;
    }

    .header-title {
      width: 100%;
      padding: 8px 10px;
      font-size: 0.95rem;
      text-align: center;
      background: var(--surface-section, #f8fafc);
      color: var(--text-color, #1f2937);
      border-bottom: 1px solid var(--surface-border, #ccc);
    }

    .header-item {
      display: grid;
      grid-template-columns: minmax(88px, 26%) minmax(0, 1fr) minmax(84px, auto);
      gap: 8px;
      padding: 7px 10px;
      font-size: 0.8125rem;
      background-color: #002147;
      width: 100%;
      text-align: left;
      align-items: center;

      div {
        color: #fff;
        min-width: 0;
      }

      div:last-child {
        text-align: right;
      }
    }

    .item-container {
      display: block;

      .item {
        display: grid;
        grid-template-columns: minmax(88px, 26%) minmax(0, 1fr) minmax(84px, auto);
        gap: 8px;
        padding: 7px 10px;
        font-size: 0.8125rem;
        border-top: 1px solid var(--surface-border, #e2e8f0);
        color: var(--text-color, #1f2937);
        text-align: left;
        align-items: start;
        page-break-inside: avoid;
        break-inside: avoid;

        div {
          min-width: 0;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        div:last-child {
          white-space: nowrap;
          text-align: right;
          font-variant-numeric: tabular-nums;
          font-weight: 600;
        }
      }

      .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 9px 10px;
        font-size: 0.875rem;
        font-weight: 700;
        border-top: 2px solid var(--surface-border, #cbd5e1);
        background: var(--surface-section, #f8fafc);
        color: var(--text-color, #1f2937);
        page-break-inside: avoid;
        break-inside: avoid;
        page-break-before: avoid;
        break-before: avoid;

        div:empty {
          display: none;
        }

        div:last-child {
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }
      }
    }
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr));
    gap: 10px;
    margin: 10px 0 14px;
    width: 100%;
    align-items: stretch;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .summary-card {
    display: flex;
    flex-direction: column;
    padding: 10px 12px;
    background-color: var(--surface-card, #f9f9f9);
    border: 1px solid var(--surface-border, #ccc);
    border-radius: 8px;
  }

  .summary-card-title {
    font-size: 0.8125rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-bottom: 1px solid var(--surface-border, #ccc);
    padding-bottom: 5px;
    margin-bottom: 6px;
    color: var(--text-color, #333);
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    padding: 3px 0;
    font-size: 0.8125rem;
    color: var(--text-color, #333);
    text-align: left;

    .label {
      color: var(--text-color-secondary, #555);
      min-width: 0;
    }

    .value {
      font-weight: 600;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
  }

  .summary-row.total {
    border-top: 1.5px solid var(--surface-border, #999);
    margin-top: 4px;
    padding-top: 6px;
    font-size: 0.875rem;

    .label,
    .value {
      font-weight: 800;
    }
  }

  .value.positive {
    color: var(--app-success, #2e7d32);
  }

  .value.negative {
    color: var(--app-error, #ef5350);
  }

  /* Print overrides: crisp white paper regardless of dark mode */
  @media print {
    font-size: 8pt;
    color: #000 !important;

    .container-header {
      border-bottom-color: #002147 !important;
    }
    .header-logo {
      width: 80px;
      max-height: 70px;
    }
    .header-residential-name {
      font-size: 13pt;
      color: #002147 !important;
    }
    .header-department {
      font-size: 9pt;
      color: #555 !important;
    }
    .report-title {
      font-size: 14pt;
      color: #000 !important;
    }
    .report-subtitle {
      font-size: 12pt;
      color: #333 !important;
    }
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin: 6px 0;
    }
    .summary-card {
      background-color: #fff !important;
      border: 1px solid #ccc !important;
      padding: 5px 8px;
      border-radius: 4px;
      -webkit-print-color-adjust: exact;
    }
    .summary-card-title {
      font-size: 8pt;
      color: #000 !important;
      border-bottom-color: #ccc !important;
      padding-bottom: 3px;
      margin-bottom: 3px;
    }
    .summary-row {
      font-size: 7pt;
      padding: 1.5px 0;
      color: #000 !important;
    }
    .summary-row .label {
      color: #555 !important;
    }
    .summary-row.total {
      font-size: 8pt;
      border-top-color: #999 !important;
    }
    .value.positive {
      color: green !important;
    }
    .value.negative {
      color: red !important;
    }
    .date-range {
      flex-direction: column;
      align-items: stretch;
    }
    .table {
      width: 100%;
      border-radius: 0;
      background: #fff !important;
      border-color: #ccc !important;
    }
    .table .header-title {
      background: #fff !important;
      color: #000 !important;
      font-size: 11pt;
    }
    .table .header-item {
      font-size: 9pt;
      padding: 4px 6px;
    }
    .table .item-container .item {
      font-size: 7.5pt;
      padding: 3px 6px;
      color: #000 !important;
      border-color: #000 !important;
    }
    .table .item-container .total {
      font-size: 9pt;
      padding: 5px 6px;
      background: #fff !important;
      color: #000 !important;
      border-color: #000 !important;
    }
  }
`;
