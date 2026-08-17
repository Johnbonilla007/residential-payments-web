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
    background-color: var(--table-head-bg) !important;
    color: var(--text-color) !important;
    border-color: var(--border-color) !important;
  }
  /* PrimeReact sets its own color on the inner title/content spans, so the th
     color above never reaches the actual header text. Target them directly
     so headers stay readable in dark mode. */
  .p-datatable .p-datatable-thead > tr > th .p-column-title,
  .p-datatable .p-datatable-thead > tr > th .p-column-header-content,
  .p-datatable .p-datatable-thead > tr > th .p-sortable-column-icon {
    color: var(--text-color) !important;
  }
  .p-column-filter-row .p-column-filter-element {
    text-align: left;
  }

  /* Responsive Cell Layout */
  .p-column-title {
    display: none;
  }

  @media screen and (max-width: 960px) {
    .p-datatable .p-datatable-thead {
      display: none !important;
    }

    .p-datatable .p-datatable-tbody > tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid var(--border-color) !important;
      border-radius: var(--radius-lg) !important;
      background-color: var(--card-bg) !important;
      padding: 0;
      overflow: hidden;
    }

    .p-datatable .p-datatable-tbody > tr > td {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      padding: 1rem !important;
      border: none !important;
      border-bottom: 1px solid var(--border-color) !important;
      text-align: right;
    }

    .p-datatable .p-datatable-tbody > tr > td:last-child {
      border-bottom: none !important;
    }

    .p-column-title {
      display: block !important;
      font-weight: 600;
      min-width: 30%;
      text-align: left;
    }
  }
`;
