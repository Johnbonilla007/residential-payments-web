import styled from "styled-components";

export const TableControlStyled = styled.div`
  .card {
    background-color: var(--card-bg);
    color: var(--text-color);
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  h5 {
    color: var(--text-color);
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }

  .p-datatable table {
    font-size: 10pt;
  }
  .p-datatable .p-datatable-tbody > tr > td {
    padding: 1rem; /* Más espacio */
    border-color: var(--border-color);
    color: var(--text-color);
  }
  .p-datatable .p-datatable-thead > tr > th {
    padding: 1rem;
    text-align: center;
    background-color: var(--surface-color);
    color: var(--text-color);
    border-color: var(--border-color);
  }
  .p-column-filter-row .p-column-filter-element {
    text-align: left;
  }
`;
