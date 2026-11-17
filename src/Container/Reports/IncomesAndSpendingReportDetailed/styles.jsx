import styled from "styled-components";

export const IncomeReportStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    align-items: end;
    padding: clamp(0.875rem, 1.5vw, 1.5rem);
    background: var(--surface-card);
    border-radius: var(--radius-lg);
    box-shadow: var(--app-shadow-md);
    border: 1px solid var(--surface-border);

    .p-dropdown,
    .p-calendar,
    .p-inputtext {
      width: 100%;
    }

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }

  .calendar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
  }

  .table-container {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .total-row {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 1rem;
    color: var(--text-color);
    font-size: 1.1rem;
  }
`;
