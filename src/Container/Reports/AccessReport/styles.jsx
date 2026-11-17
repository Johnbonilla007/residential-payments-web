import styled from "styled-components";

export const AccessReportStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
    align-items: end;
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-lg);
    padding: 14px;

    .p-dropdown,
    .p-calendar,
    .p-inputtext {
      width: 100%;
    }

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }

  .p-datatable-wrapper {
    max-height: 65vh;
  }
`;
