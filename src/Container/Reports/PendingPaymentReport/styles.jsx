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
    background: #ffffff;
    border-radius: 12px;
    padding: 20px 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #edf2f7;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    flex: 1;
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1 1 200px;
    min-width: 220px;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #4a5568;
    }
    
    .p-dropdown, .p-calendar, .p-inputtext, .p-component {
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
    gap: 12px;
    align-items: flex-end;
    margin-left: auto;

    .p-button {
      border-radius: 8px;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #edf2f7;

    .p-datatable-header {
      background: transparent;
      border: none;
      padding-bottom: 20px;
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
    }

    .p-datatable .p-datatable-thead > tr > th {
      background: #f8fafc;
      color: #475569;
      font-weight: 600;
      font-size: 0.875rem;
      border-top: none;
    }
  }

  @media (max-width: 768px) {
    .filter-card {
      flex-direction: column;
      align-items: stretch;
    }
    
    .filters {
      flex-direction: column;
    }

    .filter-item {
      width: 100%;
      flex: none;
    }
    
    .filter-actions {
      margin-left: 0;
      width: 100%;
      justify-content: stretch;
      margin-top: 10px;
      
      .p-button {
        flex: 1;
        justify-content: center;
      }
    }
  }
`;
