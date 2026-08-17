import styled from "styled-components";

export const SecurityAndManagementContainerSyled = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que las tarjetas se envuelvan */
  justify-content: center; /* Centra las tarjetas horizontalmente */
  gap: 10px; /* Espacio entre las tarjetas */
  overflow: auto;
  padding: 30px;
  max-height: 80vh;
  scrollbar-width: thin; /* Para Firefox */
  scrollbar-color: var(--app-primary) var(--surface-card); /* Para Firefox */
  margin-top: 20px;
  .item {
    margin: 10px;
    flex: 1 1 300px; /* Hace que las tarjetas sean flexibles y tengan un ancho mínimo */
    max-width: 300px; /* Máximo ancho de cada tarjeta */
    max-height: 150px; /* Máximo ancho de cada tarjeta */
  }
`;
