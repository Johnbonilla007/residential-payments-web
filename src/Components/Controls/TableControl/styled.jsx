import styled from "styled-components";

export const TableControlStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;

  .card {
    background-color: var(--surface-card);
    color: var(--text-color);
    padding: clamp(0.75rem, 1.5vw, 1.25rem);
    border-radius: var(--radius-lg);
    box-shadow: var(--app-shadow-md);
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }

  .export-buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-left: auto;
  }

  .table-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.85rem;
    padding-bottom: 0.65rem;
    border-bottom: 1px solid var(--border-color);

    h5 {
      margin: 0;
      padding: 0;
      border: none;
      text-align: left;
    }
  }

  h5 {
    color: var(--text-color);
    font-size: 1.25rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.75rem;
  }

  .p-datatable {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    min-width: 0;
  }

  .p-datatable .p-datatable-wrapper {
    overflow-x: auto;
    overflow-y: auto;
    max-height: clamp(320px, 60dvh, 680px);
    width: 100%;
    scrollbar-width: thin;
  }

  .p-datatable table {
    font-size: 0.9375rem;
    width: 100%;
  }

  .p-datatable .p-datatable-tbody > tr > td {
    padding: clamp(0.625rem, 1vw, 0.95rem);
    border-color: var(--border-color);
    color: var(--text-color);
  }

  .p-datatable .p-datatable-thead {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  .p-datatable .p-datatable-thead > tr > th {
    padding: clamp(0.625rem, 1vw, 0.95rem);
    text-align: center;
    background-color: var(--table-head-bg) !important;
    color: var(--text-color) !important;
    border-color: var(--border-color) !important;
    white-space: nowrap;
  }

  .p-datatable .p-datatable-thead > tr > th .p-column-title,
  .p-datatable .p-datatable-thead > tr > th .p-column-header-content,
  .p-datatable .p-datatable-thead > tr > th .p-sortable-column-icon {
    color: var(--text-color) !important;
  }

  .p-datatable .p-datatable-thead > tr.p-filter-row > th,
  .p-datatable .p-datatable-thead > tr:nth-child(2) > th {
    padding: 0.45rem 0.65rem;
    font-weight: 400;
  }

  .p-column-filter-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    width: 100%;
  }

  .p-column-filter-row .p-column-filter-element {
    flex: 1 1 auto;
    min-width: 7.5rem;
    text-align: left;
  }

  .p-column-filter-row .p-inputtext {
    width: 100%;
    height: 34px;
    padding: 0.35rem 0.65rem;
    font-size: 0.82rem;
    border-radius: 8px;
    background: var(--surface-card);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: var(--text-color-secondary);
      opacity: 0.7;
    }

    &:focus {
      border-color: var(--color-primary, var(--app-primary));
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
    }
  }

  .p-column-filter-row .p-column-filter-menu-button,
  .p-column-filter-row .p-column-filter-clear-button {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    border-radius: 6px;
    color: var(--text-color-secondary);
    opacity: 0.75;
    transition: opacity 0.2s ease, background-color 0.2s ease;

    &:hover {
      opacity: 1;
      background: rgba(148, 163, 184, 0.15);
    }
  }
`;

export const MobileTableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
`;

export const MobileTableTitle = styled.h5`
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  font-size: 1rem !important;
  font-weight: 600;
  color: var(--text-color);
  text-align: left;
`;

export const DetailList = styled.dl`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--surface-border);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const DetailLabel = styled.dt`
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-color-secondary);
  text-align: left;
  flex: 0 0 42%;
`;

export const DetailValue = styled.dd`
  margin: 0;
  font-size: 0.9375rem;
  color: var(--text-color);
  text-align: right;
  word-break: break-word;
  flex: 1 1 auto;
`;

export const MobileActionsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;

  .p-button,
  button {
    min-width: 44px;
    min-height: 44px;
  }
`;
