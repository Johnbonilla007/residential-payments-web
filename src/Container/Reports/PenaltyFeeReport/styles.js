import styled from "styled-components";

export const PenaltyFeeReportStyled = styled.div`
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
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
    background-color: #e57373; /* Light red */
    color: #fff;
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
    background-color: #f5f5f5;
  }

  .empty-lot {
    background-color: #f0f0f0; /* Light gray for empty lots */
  }

  .dropdown-item div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .dropdown-label {
    font-size: 0.85rem;
    color: #888; /* Subtle gray color for labels */
  }

  .dropdown-value {
    font-size: 1rem;
    font-weight: bold;
  }
`;
