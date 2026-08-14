import styled from "styled-components";

export const FinancialMovementStyled = styled.div`
  .financial-movement-card {
    border: 1px solid var(--surface-border);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    margin: 16px;

    background-color: var(--surface-card);
  }

  /* Always-dark header band, so its text follows the nav token, not the fill. */
  .card-header {
    flex: 1;
    margin-right: 16px;
    background-color: var(--app-nav-bg);
    padding: 16px;
    color: var(--app-nav-text);
    p {
      font-size: 12pt;
      font-weight: 600;
      color: var(--app-nav-text);
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
    color: var(--app-error);
    cursor: pointer;

    font-size: 24px;
  }

  .btn-delete:hover {
    color: var(--app-error);
  }
`;
