import styled from "styled-components";

export const PenaltiesFeeListComponentStyled = styled.div`
  .penalty-item {
    padding: 20px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative; /* For positioning the image in the corner */
    transition: transform 0.2s ease, box-shadow 0.3s ease;

    .commands {
      display: flex;
      justify-content: flex-start;
      gap: 30px;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .item-header {
      font-size: 18px;
      font-weight: bold;
      color: #007bff;
    }

    .item-detail {
      font-size: 16px;
      color: #333;
      margin-bottom: 5px;

      span {
        font-weight: bold;
      }
    }

    .image-preview {
      position: absolute; /* Position the image in the corner */
      top: 10px;
      right: 10px;
      width: 35%; /* Small image size */
      height: auto;

      .thumbnail {
        width: 100%;
        height: auto;
        border-radius: 8px;
        cursor: pointer; /* Show cursor as pointer to indicate it's clickable */
      }
    }
  }

  // Loading state styling
  .loading {
    text-align: center;
    font-size: 20px;
    color: #007bff;
    margin-top: 20px;
  }

  // Responsiveness
  @media (max-width: 768px) {
    .penalty-item {
      padding: 15px;
      margin-bottom: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Adjust shadow for small screens */
    }

    .item-header {
      font-size: 16px;
    }

    .item-detail {
      font-size: 14px;
    }

    .image-preview {
      top: 5px;
      right: 5px;
      width: 45%; /* Slightly larger for small screens */
    }
  }

  // Additional responsiveness for extra small screens
  @media (max-width: 480px) {
    .penalty-item {
      padding: 10px;
      margin-bottom: 8px;
    }

    .item-header {
      font-size: 14px;
    }

    .item-detail {
      font-size: 12px;
    }

    .image-preview {
      top: 5px;
      right: 5px;
      width: 50%; /* Increase image size for smaller screens */
    }
  }
`;
