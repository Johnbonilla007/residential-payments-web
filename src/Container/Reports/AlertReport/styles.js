import { Button } from "primereact/button";
import styled from "styled-components";

export const AlertReportStyled = styled.div`
  display: flex;
  flex-direction: column;

  .filters {
    display: flex;
    gap: 10px;

    .only-pending {
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }

  .p-datatable-wrapper {
    height: 580px;
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
