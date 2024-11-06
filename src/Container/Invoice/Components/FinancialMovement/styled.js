import styled from "styled-components";

export const FinancialMovementStyled = styled.div`
  .financial-movement-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    margin: 16px;

    background-color: #fff;
  }

  .card-header {
    flex: 1;
    margin-right: 16px;
    background-color: #3d6064;
    padding: 16px;
    color: #fff;
    p {
      font-size: 12pt;
      font-weight: 600;
      color: #fff;
    }
  }

  .card-header h3 {
    margin: 0;
  }

  .card-body {
    display: flex;
    flex-wrap: wrap;
  }

  .card-item {
    display: flex;
    align-items: center;
    margin: 12px;
    p {
      font-size: 12pt;
      font-weight: 600;
    }
  }

  .item-icon {
    margin-right: 8px;
    font-size: 24px;
  }

  .item-details p {
    margin: 0;
  }

  .card-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .btn-delete {
    background-color: transparent;
    border: none;
    color: #d9534f;
    cursor: pointer;

    font-size: 24px;
  }

  .btn-delete:hover {
    color: #c9302c;
  }
`;
