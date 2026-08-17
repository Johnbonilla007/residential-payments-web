import styled from "styled-components";

export const CameraWrapper = styled.div`
  text-align: center;
  margin: 20px auto;
  padding: 20px;
  max-width: 600px;
  background: var(--surface-card);
  color: var(--text-color);
  border-radius: var(--radius-md);
  box-shadow: var(--app-shadow-md);
  transition:
    background-color var(--transition-base),
    box-shadow var(--transition-base);

  h2 {
    margin-bottom: 20px;
    color: var(--text-color);
  }

  .webcam-container {
    margin-bottom: 20px;
    position: relative;

    .webcam {
      width: 100%;
      max-width: 400px;
      border-radius: var(--radius-md);
      box-shadow: var(--app-shadow-md);
    }
  }

  .capture-button {
    background-color: var(--app-primary);
    color: var(--primary-color-text);
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition:
      background-color var(--transition-fast),
      box-shadow var(--transition-fast);

    &:hover {
      background-color: var(--app-primary-hover);
      box-shadow: var(--app-shadow-md);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }

  .captured-image {
    margin-top: 20px;

    img {
      width: 100%;
      max-width: 400px;
      border-radius: var(--radius-md);
      box-shadow: var(--app-shadow-md);
    }
  }
`;
