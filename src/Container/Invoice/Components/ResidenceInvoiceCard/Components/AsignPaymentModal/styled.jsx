import styled from "styled-components";

export const AsignPaymentModalStyled = styled.div`
  .form-group {
    display: grid;
    grid-template-columns: 15% 14% 14% 8% 10%;
    gap: 30px;
    margin-bottom: 2rem;
    justify-content: center;
    align-items: center;
  }

  .form-field {
    display: flex;
    flex-direction: column;
  }

  .payment-table {
    margin-top: 1.25rem;
    border: 1px solid var(--surface-border);
    border-radius: 10px;
    overflow: hidden;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .mobile-payment-cards {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .mobile-payment-card {
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    border-radius: 12px;
    padding: 0.85rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .mobile-payment-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--surface-border);

    strong {
      font-size: 0.98rem;
      color: var(--text-color);
    }
  }

  .mobile-payment-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem 0.75rem;
    text-align: left;

    .label {
      display: block;
      font-size: 0.72rem;
      color: var(--text-color-secondary);
      text-transform: uppercase;
    }

    .val {
      font-size: 0.86rem;
      font-weight: 600;
      color: var(--text-color);
    }
  }
`;
