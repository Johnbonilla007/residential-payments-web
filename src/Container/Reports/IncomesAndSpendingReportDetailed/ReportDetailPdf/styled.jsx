import styled from "styled-components";

export const ReportDetailPdfStyled = styled.div`
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
    align-items: center;
    gap: 14px;
    width: 100%;
    margin-bottom: 8px;
    padding-bottom: 6px;
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
    text-align: left;
  }

  .header-residential-name {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-color, #002147);
    line-height: 1.2;
  }

  .header-department {
    font-size: 0.8rem;
    color: var(--text-color-secondary, #555);
    letter-spacing: 0.04em;
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
    min-width: 720px;
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
      grid-template-columns: ${(props) =>
        props.isIncoming
          ? "92px 104px minmax(110px, 1.1fr) 82px minmax(140px, 1.5fr) 105px 96px"
          : "100px 120px minmax(180px, 1fr) 110px"};
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
        grid-template-columns: ${(props) =>
          props.isIncoming
            ? "92px 104px minmax(110px, 1.1fr) 82px minmax(140px, 1.5fr) 105px 96px"
            : "100px 120px minmax(180px, 1fr) 110px"};
        border-top: 1px solid var(--surface-border, #cbd5e1);
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
        font-size: 0.95rem;
        padding: 10px;
        border-top: 2px solid var(--surface-border, #94a3b8);
        background: var(--surface-section, #f8fafc);
        color: var(--text-color, #1f2937);
        page-break-inside: avoid;
        break-inside: avoid;
        page-break-before: avoid;
        break-before: avoid;

        div:empty {
          display: none;
        }
      }
    }
  }

  @media print {
    color: #000 !important;
    font-size: 8pt;
    padding: 0;
    width: 100%;

    .header-residential-name {
      color: #002147 !important;
    }
    .header-department {
      color: #555 !important;
    }
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
      grid-template-columns: ${(props) =>
        props.isIncoming
          ? "62px 76px minmax(0, 1.3fr) 52px minmax(0, 2fr) 78px 78px"
          : "72px 96px minmax(0, 1fr) 84px"};
    }
    .table .item-container .item {
      font-size: 7pt;
      padding: 3px 6px;
      gap: 4px;
      box-sizing: border-box;
      grid-template-columns: ${(props) =>
        props.isIncoming
          ? "62px 76px minmax(0, 1.3fr) 52px minmax(0, 2fr) 78px 78px"
          : "72px 96px minmax(0, 1fr) 84px"};
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
