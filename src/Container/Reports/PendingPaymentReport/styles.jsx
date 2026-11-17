import styled from "styled-components";

export const PendingPaymentReportStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .filter-card {
    background: var(--surface-card);
    border-radius: 12px;
    padding: 20px 24px;
    box-shadow: var(--app-shadow-sm);
    border: 1px solid var(--surface-border);
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    align-items: end;
    flex: 1 1 600px;
    min-width: 0;
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-color-secondary);
      text-align: left;
    }

    .p-dropdown,
    .p-calendar,
    .p-inputtext,
    .p-component {
      width: 100%;
    }

    .selected-residence-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .filter-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: flex-end;
    margin-left: auto;

    .p-button {
      border-radius: 8px;
      font-weight: 600;
      min-height: 44px;
      padding: 0.65rem 1.25rem;
      transition: all 0.2s ease;

      @media (hover: hover) {
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      }
    }

    .btn-generate {
      background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
      border: none;
    }

    .btn-print {
      background: #10b981;
      border: none;
    }
  }

  .table-container {
    background: var(--surface-card);
    border-radius: 12px;
    padding: 24px;
    box-shadow: var(--app-shadow-sm);
    border: 1px solid var(--surface-border);

    .p-datatable-header {
      background: transparent;
      border: none;
      padding-bottom: 20px;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-color);
    }

    .p-datatable .p-datatable-thead > tr > th {
      background: var(--surface-section);
      color: var(--text-color-secondary);
      font-weight: 600;
      font-size: 0.875rem;
      border-top: none;
    }
  }

  @media (max-width: 767px) {
    gap: 12px;

    .filter-card {
      flex-direction: column;
      align-items: stretch;
      padding: 14px;
    }

    .filters {
      grid-template-columns: 1fr;
    }

    .filter-item {
      width: 100%;
    }

    .filter-actions {
      margin-left: 0;
      width: 100%;
      justify-content: stretch;
      margin-top: 8px;

      .p-button {
        flex: 1;
        justify-content: center;
      }
    }

    .table-container {
      padding: 10px;
    }
  }
`;
