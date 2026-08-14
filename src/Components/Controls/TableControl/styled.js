import styled from "styled-components";

export const TableControlStyled = styled.div`
  .card {
    background-color: var(--surface-card);
    color: var(--text-color);
    padding: 1rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--app-shadow-md);
    margin-bottom: 2rem;
  }

  /* Replaces the PrimeFlex utility classes the markup used to rely on. */
  .export-buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
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
