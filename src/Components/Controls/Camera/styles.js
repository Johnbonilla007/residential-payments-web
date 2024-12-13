import styled from "styled-components";

export const CameraWrapper = styled.div`
  text-align: center;
  margin: 20px auto;
  padding: 20px;
  max-width: 600px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  .webcam-container {
    margin-bottom: 20px;
    position: relative;

    .webcam {
      width: 100%;
      max-width: 400px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .capture-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }

  .captured-image {
    margin-top: 20px;

    img {
      width: 100%;
      max-width: 400px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;
