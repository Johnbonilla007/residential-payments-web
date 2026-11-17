import styled from "styled-components";

export const UsersStyled = styled.div`
  margin: 4px;
  min-height: 70vh;

  .container {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .commandbox {
      min-width: 220px;
      flex: 0 1 280px;
    }

    .calendar {
      margin-right: 16px;
    }

    .table {
      width: 100%;
      border: 1px solid var(--surface-border);
      border-radius: 15px;
      padding: clamp(6px, 1vw, 14px);
      background: var(--surface-card);
    }

    .options {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 4px;
    }

    .buttonPDF {
      background-color: var(--app-success);
    }
  }
`;

export const ActionButtonsStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;

  .p-button {
    min-width: 38px;
    min-height: 38px;
  }

  @media (max-width: 767px) {
    .p-button {
      min-width: 44px;
      min-height: 44px;
    }
  }
`;
