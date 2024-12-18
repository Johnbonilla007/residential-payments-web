import styled from "styled-components";

// Styled Components
export const PayPenaltyFeeStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .input-group {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    input,
    textarea,
    .dropdown,
    .calendar {
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    .calendar {
      display: flex;
      align-items: center;
    }
  }

  .form-group {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    font-weight: bold;
  }
`;