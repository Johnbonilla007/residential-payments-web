import styled from "styled-components";

export const SignatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;

  h3 {
    margin-bottom: 10px;
    color: var(--text-color);
  }
`;

export const SignatureCanvasWrapper = styled.div`
  border: 2px solid var(--surface-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  height: 80px;
  width: 100%;
  max-width: 500px;
  position: relative;
  transition: border-color var(--transition-fast);

  .input-text {
    display: flex;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;

  button:not(.p-button) {
    padding: 8px 15px;
    margin: 0 5px;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 14px;
    transition:
      background-color var(--transition-fast),
      box-shadow var(--transition-fast),
      opacity var(--transition-fast);

    &.save {
      background-color: var(--app-success);
      color: var(--primary-color-text);
    }

    &.clear {
      background-color: var(--app-error);
      color: var(--primary-color-text);
    }

    &:hover {
      opacity: 0.85;
      box-shadow: var(--app-shadow-md);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }
`;

export const SavedSignature = styled.div`
  margin-top: 20px;
  text-align: center;

  img {
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-sm);
    width: 100%;
    max-width: 500px;
    height: auto;
  }

  h4 {
    margin-bottom: 10px;
    color: var(--text-color);
  }
`;
