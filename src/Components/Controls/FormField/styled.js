import styled from "styled-components";

export const FormFieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  &.form-field--full {
    grid-column: 1 / -1;
  }

  .p-float-label {
    display: block;
    width: 100%;
  }

  /**
   * Controls fill the field instead of sizing themselves. Without this, a
   * dropdown sizes to its longest option and a text input to its size
   * attribute, which is why neighbouring controls used to end up different
   * widths and heights.
   */
  .p-inputtext,
  .p-dropdown,
  .p-multiselect,
  .p-calendar,
  .p-inputnumber,
  .p-inputnumber-input,
  .p-password,
  .p-password-input {
    width: 100%;
  }

  .form-field__error {
    margin-top: 0.25rem;
    min-height: 1rem;
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--app-error);
  }

  &.form-field--invalid {
    .p-inputtext,
    .p-dropdown,
    .p-calendar .p-inputtext,
    .p-inputnumber .p-inputtext {
      border-color: var(--app-error);
    }
  }
`;
