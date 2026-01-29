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
      border-radius: 10px;
      box-shadow: ${(props) => props.theme.colors.cardShadow};
      overflow: hidden;
      transition: transform 0.2s;
      width: 300px;
      height: 220px;
      margin: 20px;
      cursor: pointer;
    }

    .invoice-card:hover {
      transform: scale(1.05);
      border-color: ${(props) => props.theme.colors.info};
    }

    .invoice-header {
      background-color: ${(props) => props.theme.colors.surfaceHighlight};
      padding: 10px;
      border-bottom: 1px solid ${(props) => props.theme.colors.border};
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .invoice-header h3 {
      margin: 0;
      font-size: 1.2em;
      color: ${(props) => props.theme.colors.text};
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
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: ${(props) => props.theme.colors.text};
    }

    .invoice-content p {
      margin: 10px 0;
      font-size: 1em;
      color: ${(props) => props.theme.colors.textSecondary};
    }

    .invoice-content p strong {
      color: ${(props) => props.theme.colors.text};
    }
  }
`;
