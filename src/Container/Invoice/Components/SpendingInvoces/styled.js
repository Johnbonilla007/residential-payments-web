import styled from "styled-components";

export const SpendingInvocesStyled = styled.div`
  .item-invoice {
    display: grid;
    /* Columnas que se ajustan al contenido: código, proveedor flexible, usuario,
       fecha e íconos. Antes eran % fijos y el texto se partía/apretaba. */
    grid-template-columns: minmax(120px, auto) minmax(0, 1fr) minmax(110px, auto) minmax(100px, auto) 44px 44px;
    align-items: stretch;
    margin: 5px;
    background-color: white;
    box-shadow: var(--app-shadow-sm);
    border-radius: 5px;

    div {
      display: flex;
      align-items: center;
      padding: 10px;
      font-weight: 600;
      color: var(--text-color, #1f2937);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .invoiceno {
      background-color: var(--app-success);
      min-height: 50px;
      display: flex;
      align-items: center;
      border-radius: 5px 0px 0px 5px;
      color: white;
      font-weight: 700;
      white-space: nowrap;
    }
  }

  /* En pantallas chicas: código arriba a lo ancho, el resto en dos filas. */
  @media (max-width: 768px) {
    .item-invoice {
      grid-template-columns: 1fr 1fr 44px 44px;
      grid-auto-rows: auto;

      .invoiceno {
        grid-column: 1 / -1;
        border-radius: 5px 5px 0 0;
      }

      div {
        white-space: normal;
      }
    }
  }
`;
