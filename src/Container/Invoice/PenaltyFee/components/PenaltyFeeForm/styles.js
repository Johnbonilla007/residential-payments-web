import styled from "styled-components";

export const PenaltyFeeFormStyled = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .p-float-label {
    position: relative;
    display: flex;
    flex-direction: column;

    input,
    select,
    textarea {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 5px;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #007bff;
        outline: none;
      }
    }

    label {
      position: absolute;
      top: -10px;
      left: 10px;
      background: #fff;
      padding: 0 5px;
      font-size: 12px;
      color: #555;
      transition: color 0.3s ease;
    }
  }

  .field-label {
    font-weight: bold;
  }

  .field-value {
    font-size: 16px;
    color: #007bff;
  }

  .image-container {
    text-align: center;
    position: relative;

    .image-preview {
      display: inline-block;
      position: relative;
      margin-bottom: 20px;

      .residence-image {
        width: 100%;
        max-width: 300px;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }
      }

      .edit-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.6);
        padding: 5px;
        border-radius: 50%;
        cursor: pointer;

        .edit-icon {
          color: #fff;
          font-size: 16px;
        }
      }
    }

    .upload-button {
      display: inline-block;
      margin: 10px 5px;
      background-color: #007bff;
      color: #fff;
      padding: 10px 15px;
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
  .dialog {
    text-align: center;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }

  .upload-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }

  @media (max-width: 768px) {
    padding: 15px;

    .residence-image {
      max-width: 100%;
    }
  }
`;
