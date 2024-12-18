import styled from "styled-components";

export const CardComponentPenaltyFeeStyled = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  width: 280px; /* Ancho reducido */
  max-height: 290px; /* Control de altura */
  margin: 15px;
  display: flex;
  flex-direction: column;
  position: relative;

  :hover {
    transform: scale(1.03);
  }

  /* Botón flotante Editar */
  .edit-button {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;

    .p-button {
      width: 30px;
      height: 30px;
      font-size: 0.8em;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  /* Imagen */
  .residence-image {
    width: 100%;
    height: 100px;
    background-color: #f5f5f5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /* Contenido */
  .residence-content {
    flex: 1;
    padding: 10px 15px;
    text-align: left;

    p {
      margin: 3px 0;
      font-size: 0.9em;
      color: #333;

      strong {
        color: #555;
      }
    }
  }

  /* Botones */
  .buttons-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 8px;
    justify-content: space-around;

    button {
      flex: 1 1 calc(50% - 10px); /* Distribución en 2 columnas */
      min-width: 100px;
      height: 35px; /* Altura más compacta */
      font-size: 0.85em;
    }
  }
`;
