import styled from "styled-components";

export const CreateOrUpdatePaymentTypeStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .header-payment-type {
    display: flex;
    gap: 15px;
  }

  .payment-type-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const PaymentTypeFormStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding-top: 15px;
`;
