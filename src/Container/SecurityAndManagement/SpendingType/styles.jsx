import styled from "styled-components";

export const SpendingTypeStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .header-payment-type {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .payment-type-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
