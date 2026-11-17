import styled from "styled-components";

export const IncomeAndSpendingReportSummarizedStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
    align-items: end;
    background: var(--surface-card);
    padding: clamp(0.875rem, 1.5vw, 1.25rem);
    border-radius: var(--radius-lg);
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

  .tables {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .houses-summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .houses-summary .item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: ${(props) => props.theme.colors.cardBg};
    border: 1px solid ${(props) => props.theme.colors.border};
    color: ${(props) => props.theme.colors.text};
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .table-summarize-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

    > * {
      flex: 1 1 320px;
      min-width: 0;
    }
  }

  /* Tres tarjetas agrupadas por tema (Ingresos/Gastos/Disponible) en vez de
     cajitas sueltas sin relación visual entre sí. */
  .summary-cards {
    display: flex;
    gap: 16px;
    margin: 10px 0 2rem;
    align-items: stretch;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .summary-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem 1.25rem;
    background-color: ${(props) => props.theme.colors.cardBg};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .summary-card-title {
    font-size: 0.9rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.text};
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 4px 0;
    color: ${(props) => props.theme.colors.text};

    .label {
      color: ${(props) => props.theme.colors.textSecondary};
      font-size: 0.85rem;
    }

    .value {
      font-weight: 600;
      white-space: nowrap;
    }
  }

  .summary-row.total {
    border-top: 1px solid ${(props) => props.theme.colors.border};
    margin-top: 4px;
    padding-top: 8px;

    .label,
    .value {
      font-weight: 800;
      font-size: 1rem;
    }
  }

  .value.positive {
    color: green;
  }

  .value.negative {
    color: var(--app-error);
  }
`;
