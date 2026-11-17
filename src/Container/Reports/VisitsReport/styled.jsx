import styled from "styled-components";

export const ReportStyled = styled.div`
  padding: 6px;
  min-height: 75vh;
  width: 100%;
  min-width: 0;

  .p-column-filter-row .p-column-filter-menu-button,
  .p-column-filter-row .p-column-filter-clear-button {
    display: none;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;

    .commandbox,
    .calendar {
      width: 100%;
    }

    .table {
      width: 100%;
      min-width: 0;
      border: 1px solid var(--surface-border);
      border-radius: 15px;
      padding: 6px;
    }

    .options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      align-items: end;
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
      padding: 14px;

      @media (max-width: 767px) {
        grid-template-columns: 1fr;
      }
    }

    .buttonPDF {
      background-color: var(--app-success);
    }
  }
`;
