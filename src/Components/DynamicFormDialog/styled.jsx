import styled from "styled-components";

export const DynamicFormDialogStyled = styled.div`
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
    gap: 16px;
    padding-top: 4px;

    .form {
      overflow: auto;
    }

    .container-input {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;

      label {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-color-secondary);
        text-align: left;
      }

      .p-inputtext,
      .p-dropdown,
      .p-multiselect,
      .p-calendar,
      .p-inputnumber,
      .p-password,
      .p-inputmask,
      .p-inputtextarea {
        width: 100%;
      }
    }

    .container-input--checkbox {
      grid-column: 1 / -1;
      flex-direction: row;
      align-items: center;
      min-height: 44px;
      gap: 10px;
    }
  }

  @media (max-width: 767px) {
    .container {
      grid-template-columns: 1fr;
      gap: 14px;
    }
  }
`;
