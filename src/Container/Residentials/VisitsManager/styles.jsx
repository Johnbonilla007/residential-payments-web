import { Button } from "primereact/button";
import styled from "styled-components";

export const VisitsManagerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;

  h4 {
    margin-top: 0.75rem;
    font-size: 1.25rem;
    color: var(--text-color);
  }

  p {
    text-align: center;
    font-size: 0.95rem;
    color: var(--text-color-secondary);
  }

  .table-container {
    width: 100%;
    min-width: 0;
  }
`;

export const FiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-items: end;
  gap: 12px;
  width: 100%;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--app-shadow-sm);

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    padding: 12px;
  }
`;

export const UserFilter = styled.div`
  width: 100%;

  .p-dropdown,
  .p-inputtext {
    width: 100%;
  }
`;

export const DateFilter = styled.div`
  width: 100%;

  .p-calendar,
  .p-inputtext {
    width: 100%;
  }
`;

export const UserGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  width: 100%;
  gap: 8px;

  .p-button {
    min-width: 44px;
    min-height: 44px;
  }
`;

export const ButtonFullWidth = styled(Button)`
  width: 100%;
  min-height: 44px;
`;

export const TableStyled = styled.div`
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    text-align: left;
    background-color: var(--surface-card);

    th,
    td {
      padding: 0.8rem;
      text-align: left;
      border-bottom: 1px solid var(--surface-border);
      white-space: nowrap;
    }

    th {
      background-color: var(--surface-card);
      font-weight: bold;
      color: var(--text-color);
    }
  }
`;
