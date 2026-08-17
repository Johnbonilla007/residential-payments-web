import styled from "styled-components";

export const ReceiptsPenaltiesFeeComponentStyled = styled.div`
  .invoice-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.2rem;
    margin-bottom: 1.5rem;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    h3,
    h4 {
      margin-bottom: 0.5rem;
      color: #333;
    }

    p {
      margin: 0.3rem 0;
      font-size: 0.95rem;
      color: #555;
    }

    .invoice-detail {
      margin-top: 1rem;

      .detail-item {
        padding: 0.5rem 0;
        border-top: 1px solid #ddd;

        &:last-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .print-button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 0.95rem;
      cursor: pointer;
      border-radius: 4px;
      margin-top: 1rem;
      transition: background 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .loading-state,
  .empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;

    img {
      width: 200px;
      margin-top: 1rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 768px) {
    .invoice-card {
      padding: 1rem;
    }

    h3,
    h4 {
      font-size: 1rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;
