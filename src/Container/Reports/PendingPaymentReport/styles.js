import styled from "styled-components";

export const PendingPaymentReportStyled = styled.div`
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
`;
