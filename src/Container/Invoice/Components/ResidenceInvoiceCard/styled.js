import styled from "styled-components";

export const ResidenceInvoiceCardStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 5px;
  padding: 20px;
  height: 75vh;
  overflow: auto;
  scrollbar-width: thin; /* Para Firefox */
  scrollbar-color: #002147 #fff; /* Para Firefox */
`;

export const CardComponentStyled = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  width: 300px;
  max-height: 290px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  justify-content: space-around;

  :hover {
    transform: scale(1.05);
  }

  /* Botón flotante */
  .edit-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;

    .p-button {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .residence-image {
    width: 100%;
    height: 120px;
    background-color: #f5f5f5;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .residence-content {
    padding: 10px 20px;
    text-align: left;

    p {
      margin: 5px 0;
      font-size: 1em;
      color: #333;

      strong {
        color: #555;
      }
    }
  }

  .buttons-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding: 10px;

    button {
      flex: 1 1 calc(33% - 16px);
      min-width: 120px;
      height: 40px;
    }
  }
`;
