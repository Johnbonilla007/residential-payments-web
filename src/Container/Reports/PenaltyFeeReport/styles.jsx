import styled from "styled-components";

export const PenaltyFeeReportStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    align-items: end;
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-lg);
    padding: 14px;

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .dropdown {
    width: 100%;
  }

  .selected-residence {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .calendar label {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .clear-button {
    transition: background 0.3s ease;
  }

  .clear-button:hover {
    background-color: var(--app-error); /* Light red */
    color: var(--primary-color-text);
  }

  .table-container {
    margin-top: 1rem;
  }

  .dropdown-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .dropdown-item:hover {
    background-color: var(--surface-card);
  }

  .empty-lot {
    background-color: var(--surface-card); /* Light gray for empty lots */
  }

  .dropdown-item div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .dropdown-label {
    font-size: 0.85rem;
    color: var(--text-color-secondary); /* Subtle gray color for labels */
  }

  .dropdown-value {
    font-size: 1rem;
    font-weight: bold;
  }
`;
