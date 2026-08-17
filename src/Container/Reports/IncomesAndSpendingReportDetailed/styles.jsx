import styled from "styled-components";

export const IncomeReportStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow: hidden;

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    background: var(--surface-card);
    border-radius: var(--radius-lg);
    box-shadow: var(--app-shadow-md);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .calendar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
  }

  .table-container {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
`;
