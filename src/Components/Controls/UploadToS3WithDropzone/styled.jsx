import styled from "styled-components";
import { media } from "../../../Styles/themes";

export const UploadToS3WithDropzoneStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: var(--surface-card);
  color: var(--text-color);
  border-radius: var(--radius-md);
  box-shadow: var(--app-shadow-md);
  transition:
    background-color var(--transition-base),
    box-shadow var(--transition-base);

  .button-group {
    display: flex;
    gap: 15px;

    .upload-button {
      background-color: var(--app-primary);
      color: var(--primary-color-text);
      padding: 10px 20px;
      font-size: 14px;
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
  }

  .upload-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .dropzone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 400px;
      padding: 20px;
      border: 2px dashed var(--app-primary);
      border-radius: var(--radius-md);
      background-color: var(--surface-section);
      text-align: center;
      cursor: pointer;
      transition:
        border-color var(--transition-fast),
        background-color var(--transition-fast);

      &:hover {
        border-color: var(--app-primary-hover);
        background-color: var(--surface-hover);
      }

      p {
        font-size: 14px;
        color: var(--text-color);
      }
    }

    .webcam-container {
      margin-top: 20px;

      .webcam {
        width: 100%;
        max-width: 400px;
        border-radius: var(--radius-md);
        box-shadow: var(--app-shadow-md);
      }
    }

    .capture-button {
      margin-top: 15px;
      background-color: var(--app-success);
      color: var(--primary-color-text);
      padding: 10px 15px;
      font-size: 14px;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition:
        background-color var(--transition-fast),
        box-shadow var(--transition-fast);

      &:hover {
        box-shadow: var(--app-shadow-md);
        filter: brightness(0.94);
      }

      &:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }
    }
  }

  ${media.md} {
    padding: 15px;

    .button-group {
      flex-direction: column;
      gap: 10px;
    }

    .upload-section {
      .dropzone {
        max-width: 100%;
      }

      .webcam {
        max-width: 100%;
      }
    }
  }
`;
