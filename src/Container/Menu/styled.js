import styled from "styled-components";

export const MenuStyled = styled.div`
  /* Contenedor principal para el menú */
  .container-menu {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    ); /* Auto-fit columns */
    gap: 20px; /* Space between cards */
    padding: 20px;
    max-width: 100%; /* Full width to utilize screen space */
    margin: 0 auto; /* Center content */
  }

  /* Media query for very small screens */
  @media (max-width: 480px) {
    .container-menu {
      grid-template-columns: 1fr; /* Stacks cards on small screens */
    }
  }

  /* Estilo para cada tarjeta individual */
  .container-menu > div {
    flex: 1 1 300px; /* Hace que las tarjetas sean flexibles y tengan un ancho mínimo */
    max-width: 300px; /* Máximo ancho de cada tarjeta */
    max-height: 150px; /* Máximo ancho de cada tarjeta */
  }

  /* Media query para pantallas pequeñas */
`;
