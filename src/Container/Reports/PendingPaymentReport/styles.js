import styled from "styled-components";

export const PendingPaymentReportStyled = styled.div`
  display: flex;
  flex-direction: column;

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .only-pending {
      display: flex;
      gap: 5px;
      align-items: center;
    }

    .commandbox,
    .calendar {
      flex: 1 1 200px; /* Flex-grow, flex-shrink, flex-basis */
      min-width: 200px;
    }

    .calendar {
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 768px) {
    .filters {
      flex-direction: column;
    }

    .commandbox,
    .calendar {
      width: 100%;
    }
  }
`;
