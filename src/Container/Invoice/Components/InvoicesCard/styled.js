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
    scrollbar-width: thin; /* Para Firefox */
    scrollbar-color: #002147 #fff; /* Para Firefox */
    .invoice-card {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.2s;
      width: 300px;
      height: 220px;
      margin: 20px;
      cursor: pointer;
    }

    .invoice-card:hover {
      transform: scale(1.05);
    }

    .invoice-header {
      background-color: #f8f8f8;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .invoice-header h3 {
      margin: 0;
      font-size: 1.2em;
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
      color: #4caf50;
    }

    .delete-icon {
      color: #f44336;
    }

    .invoice-content {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    .invoice-content p {
      margin: 10px 0;
      font-size: 1em;
      color: #666;
    }

    .invoice-content p strong {
      color: #333;
    }
  }
`;
