import styled from "styled-components";

export const AsignPaymentModalStyled = styled.div`
  .form-group {
    display: grid;
    grid-template-columns: 15% 14% 14% 8% 10%;
    gap: 30px;
    margin-bottom: 2rem;
    justify-content: center;
    align-items: center;
  }

  .form-field {
    display: flex;
    flex-direction: column;
  }

  .payment-table {
    margin-top: 2rem;
    border: 1px solid #ccc;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }
`;
