import styled from "styled-components";

export const InvoiceCardStyled = styled.div`
  .container-invoice {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    height: 65vh;
    overflow: auto;

    /* Scrollbar styling */
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.colors.background};
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.colors.border};
      border-radius: 10px;
    }

    scrollbar-width: thin; /* Para Firefox */
    scrollbar-color: ${(props) => props.theme.colors.primary}
      ${(props) => props.theme.colors.surface};

    .invoice-card {
      background-color: ${(props) => props.theme.colors.cardBg};
      border: 1px solid ${(props) => props.theme.colors.border};
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: all 0.3s ease;
      width: 320px;
      height: auto;
      min-height: 220px;
      margin: 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }

    .invoice-card:hover {
      transform: scale(1.05);
      border-color: ${(props) => props.theme.colors.info};
    }

    .invoice-header {
      background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }

    .invoice-header h3 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 600;
      color: white;
      letter-spacing: 0.5px;
    }

    .card-actions {
      display: flex;
      gap: 10px;
    }

    .edit-icon-invoice,
    .delete-icon {
      cursor: pointer;
      font-size: 1.2em;
    }

    .edit-icon-invoice {
      color: ${(props) => props.theme.colors.success};
    }

    .delete-icon {
      color: ${(props) => props.theme.colors.error};
    }

    .invoice-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex: 1;
      color: ${(props) => props.theme.colors.text};
    }

    .info-row {
      display: flex;
      flex-direction: column;
    }

    .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: ${(props) => props.theme.colors.textSecondary};
      font-weight: 600;
      margin-bottom: 2px;
    }

    .value {
      font-size: 0.95rem;
      color: ${(props) => props.theme.colors.text};
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1.2fr;
      gap: 10px;
      margin-top: 5px;
      padding-top: 10px;
      border-top: 1px solid ${(props) => props.theme.colors.border};
    }

    .info-item {
      display: flex;
      flex-direction: column;
    }

    .invoice-footer {
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px dashed ${(props) => props.theme.colors.border};
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .total-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.textSecondary};
    }

    .total-amount {
      font-size: 1.1rem;
      font-weight: 800;
      color: #2e7d32; /* Verde dinero */
    }
  }
`;
