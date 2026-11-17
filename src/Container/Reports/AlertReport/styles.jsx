import { Button } from "primereact/button";
import styled from "styled-components";

export const AlertReportStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    align-items: end;
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-lg);
    padding: 14px;

    .only-pending {
      display: flex;
      gap: 8px;
      align-items: center;
      min-height: 44px;
    }

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }

  .p-datatable-wrapper {
    max-height: 65vh;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    text-align: center;
    width: 50px; /* Adjust width as needed */
    font-size: 16px;
  }
`;

export const StyledButton = styled(Button)`
  &.p-button {
    font-size: 14px;
    padding: 0.5rem 1rem;
  }
`;
