import styled from "styled-components";

export const ChangePasswordModalStyled = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--maskbg);
  }

  .modal-background {
    background-color: var(--maskbg);
  }

  .modal-content {
    background-color: var(--surface-overlay);
    color: var(--text-color);
    padding: 20px;
    border-radius: var(--radius-md);
    box-shadow: var(--app-shadow-lg);
    max-width: 400px;
    width: 100%;
  }

  /* Scoped to the modal's own inputs so PrimeReact controls stay untouched. */
  .modal-content input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-sm);
    background-color: var(--surface-section);
    color: var(--text-color);
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  .modal-content input:focus {
    outline: none;
    border-color: var(--app-primary);
    box-shadow: var(--focus-ring);
  }

  .modal-content button:not(.p-button) {
    background-color: var(--app-primary);
    color: var(--primary-color-text);
    border: none;
    border-radius: var(--radius-sm);
    padding: 10px 20px;
    cursor: pointer;
    transition:
      background-color var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  .modal-content button:not(.p-button):hover {
    /* PrimeReact buttons keep their own severity colors. */
    background-color: var(--app-primary-hover);
    box-shadow: var(--app-shadow-md);
  }

  .error {
    color: var(--app-error);
    font-size: 14px;
  }
`;
