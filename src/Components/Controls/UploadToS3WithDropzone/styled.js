import styled from "styled-components";

export const UploadToS3WithDropzoneStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 20px;
  padding: 20px;
  background: ${(props) => props.theme.colors.cardBg};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .button-group {
    display: flex;
    gap: 15px;

    .upload-button {
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
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
      border: 2px dashed ${(props) => props.theme.colors.primary};
      border-radius: 8px;
      background-color: ${(props) => props.theme.colors.surface};
      text-align: center;
      cursor: pointer;
      transition: border-color 0.3s ease;

      &:hover {
        border-color: #0056b3;
      }

      p {
        font-size: 14px;
        color: ${(props) => props.theme.colors.text};
      }
    }

    .webcam-container {
      margin-top: 20px;

      .webcam {
        width: 100%;
        max-width: 400px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .capture-button {
      margin-top: 15px;
      background-color: #28a745;
      color: #fff;
      padding: 10px 15px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #218838;
      }
    }
  }

  @media (max-width: 768px) {
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
