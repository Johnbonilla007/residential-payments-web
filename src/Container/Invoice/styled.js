import styled from "styled-components";

export const InvoiceStyled = styled.div`
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    height: 78vh;
    overflow: auto;
    scrollbar-width: thin; /* Para Firefox */
    scrollbar-color: #009929 #fff; /* Para Firefox */
  }

  .card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s;
    width: 400px;
    height: 450px;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .card-image img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
  .edit-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s;
    :hover {
      transform: scale(1.09);
      background-color: #84b6f4;
    }
  }

  .card-image:hover .edit-icon {
    opacity: 1;
  }

  .card-content {
    padding: 20px;
    .first-row {
      height: 130px;
      .card-title {
        font-size: 1.5em;
        margin-bottom: 10px;
      }

      .card-text {
        font-size: 1em;
        margin-bottom: 10px;
        color: #666;
      }
    }
  }

  .secound-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;
