import styled from "styled-components";

export const ReportPendingPdfStyled = styled.div`
  @media print {
    @page {
      size: letter portrait;
      margin: 0.6cm;
    }
  }
  width: 100%;
  margin: 0;
  padding: 4px;
  color: var(--text-color, #1f2937);

  .container-header {
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .date-range {
    display: block;
    width: 100%;
    margin-top: 14px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .table {
    border: 1px solid var(--surface-border, #ccc);
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    min-width: 760px;
    background: var(--surface-card, #fff);

    .header-title {
      width: 100%;
      font-size: 1.1rem;
    }

    .header-item {
      display: grid;
      font-size: 0.8125rem;
      gap: 8px;
      padding: 8px 10px;
      grid-template-columns: minmax(120px, 1.4fr) minmax(100px, 1.1fr) 90px 92px 95px 72px 86px 96px;
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
      .item {
        display: grid;
        font-size: 0.8125rem;
        gap: 8px;
        padding: 7px 10px;
        grid-template-columns: minmax(120px, 1.4fr) minmax(100px, 1.1fr) 90px 92px 95px 72px 86px 96px;
        border-top: 1px solid var(--surface-border, #cbd5e1);
        color: var(--text-color, #1f2937);
        text-align: left;
        align-items: start;

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
        font-size: 0.95rem;
        padding: 10px;
        border-top: 2px solid var(--surface-border, #94a3b8);
        background: var(--surface-section, #f8fafc);
        color: var(--text-color, #1f2937);

        div:empty {
          display: none;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .table {
      min-width: 0;
      border: none;
      background: transparent;
    }

    .table .header-item {
      display: none;
    }

    .table .item-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .table .item-container .item {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 4px 10px;
      padding: 10px 12px;
      border: 1px solid var(--surface-border, #cbd5e1);
      border-radius: 10px;
      background: var(--surface-card, #fff);

      div:first-child {
        font-weight: 600;
      }

      div:not(:first-child):not(:last-child) {
        grid-column: 1 / -1;
        font-size: 0.78rem;
        opacity: 0.85;
      }

      div:last-child {
        grid-column: 2;
        grid-row: 1;
        font-weight: 700;
      }
    }
  }

  @media print {
    color: #000 !important;
    font-size: 8pt;
    padding: 0;
    width: 100%;

    .date-range {
      overflow-x: visible;
    }
    .table {
      min-width: 0 !important;
      width: 100% !important;
      box-sizing: border-box;
      border-radius: 0;
      background: #fff !important;
      border-color: #ccc !important;
    }
    .table .header-item {
      font-size: 7.5pt;
      padding: 4px 6px;
      gap: 4px;
      box-sizing: border-box;
      grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.2fr) 64px 66px 70px 48px 56px 76px;
    }
    .table .item-container .item {
      font-size: 7pt;
      padding: 3px 6px;
      gap: 4px;
      box-sizing: border-box;
      grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.2fr) 64px 66px 70px 48px 56px 76px;
      color: #000 !important;
      border-color: #000 !important;
    }
    .table .item-container .total {
      font-size: 8.5pt;
      padding: 6px;
      background: #fff !important;
      color: #000 !important;
      border-color: #000 !important;
    }
  }
`;
