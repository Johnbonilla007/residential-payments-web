import styled from "styled-components";

export const EditResidenceModalStyled = styled.div`
  .section {
    margin-bottom: 20px;
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .residence-details {
    display: flex;
    justify-content: space-between;

    .details-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      flex-direction: column;
    }

    .image-container {
      text-align: center;
      margin-bottom: 20px;
      position: relative;
    }

    .card-image {
      display: inline-block;
      position: relative;
      width: 100%;
      max-width: 350px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .card-image:hover {
      transform: scale(1.05);
    }

    .residence-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
      transition: opacity 0.3s ease;
    }

    .no-image-placeholder {
      width: 100%;
      height: 200px;
      background-color: #e0e0e0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #aaa;
      font-size: 18px;
      border-radius: 8px;
    }

    .edit-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      padding: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .edit-button:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    .edit-icon {
      color: white;
      font-size: 20px;
    }

    /* New View Button */
    .view-button {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background-color: #007bff;
      color: white;
      font-size: 14px;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .view-button:hover {
      background-color: #0056b3;
    }

    .card-image:hover .edit-button,
    .card-image:hover .view-button {
      display: block;
    }

    .card-image .edit-button,
    .card-image .view-button {
      display: none;
    }
  }

  .details-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  .residence-image {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .image-placeholder {
    width: 100%;
    max-width: 300px;
    height: 200px;
    background: #e0e0e0;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
    font-size: 14px;
  }

  .edit-button {
    text-align: right;
  }

  .primary-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .primary-button:hover {
    background-color: #0056b3;
  }
`;

export const EditResidenceStyled = styled.div`
  .primary-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .primary-button:hover {
    background-color: #0056b3;
  }
`;
