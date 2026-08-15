import styled from "styled-components";

export const CreateOrUpdateInvoiceModalStyled = styled.div`
  overflow-y: auto;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background || "var(--surface-card)"};

  /* SECCIONES (Tarjetas) - COMPACTO */
  .section-card {
    background-color: ${(props) => props.theme.colors.cardBg || "white"};
    padding: 0.6rem 1rem;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors.border || "var(--surface-border)"};
  }

  .section-title {
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.text || "var(--app-primary)"};
    margin-bottom: 0.5rem;
    display: block;
    border-bottom: 1px solid
      var(--surface-border);
    padding-bottom: 0.2rem;
  }

  /* CAMPOS GENERALES - Grid Compacto */
  .header-fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem 1rem;
    align-items: center;
  }

  /* DETALLES DE FACTURA - Grid Compacto */
  .detail-fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
    /* Alineado arriba para que el textarea (más alto) no descentre la fila. */
    align-items: start;
    margin-bottom: 0.5rem;
    padding-bottom: 0.2rem;
  }

  /* Descripción: etiqueta sobre el borde (como los float-label vecinos) para que
     el textarea arranque a la misma altura que Cantidad/Costo/Pago Extra. */
  .description-field {
    position: relative;
    margin-top: 5px;
  }

  .description-field > label {
    position: absolute;
    top: -8px;
    left: 0.5rem;
    z-index: 1;
    padding: 0 5px;
    font-size: 12px;
    pointer-events: none;
    background-color: ${(props) => props.theme.colors.cardBg || "white"};
    color: ${(props) =>
      props.theme.colors.textSecondary || "var(--text-color-secondary)"};
  }

  .description-field textarea {
    width: 100% !important;
    min-height: 40px;
    padding-top: 0.6rem;
    line-height: 1.3;
    resize: vertical;
  }

  /* Hacer que Tipo de Ingreso (1) y Descripción (2) sean más anchos */
  .detail-fields > div:nth-child(1),
  .detail-fields > div:nth-child(2) {
    grid-column: span 2;
  }

  .detail-fields .p-checkbox {
    margin-top: 15px;
  }

  /* Descripción Extra: más ancha para que la etiqueta flotante no se parta. */
  .detail-fields .description-extra-field {
    grid-column: span 2;
  }

  /* Las etiquetas flotantes no se parten en dos líneas dentro de celdas angostas. */
  .detail-fields .p-float-label > label {
    white-space: nowrap;
  }

  /* INPUTS Y CONTROLES - FULL WIDTH FIXES */
  .p-float-label {
    width: 100%;
    display: block;
    margin-top: 5px;
  }

  .p-inputtext,
  .p-dropdown,
  .p-calendar,
  .p-inputnumber,
  textarea {
    width: 100% !important;
  }

  .p-calendar.p-calendar-w-btn {
    width: 100% !important;
    min-width: 0;

    .p-inputtext {
      width: 100% !important;
      flex: 1;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .p-datepicker-trigger {
      flex-shrink: 0;
      width: 2.5rem;
    }
  }

  .p-dropdown {
    width: 100% !important;
    min-width: 0;
  }

  .p-inputnumber {
    width: 100% !important;
    span {
      width: 100%;
    }
    input {
      width: 100% !important;
    }
  }

  /* Asegurar que el label no rompa el layout en modo oscuro */
  .p-float-label > label {
    left: 0.5rem;
    background-color: ${(props) => props.theme.colors.cardBg || "white"};
    color: ${(props) => props.theme.colors.textSecondary || "var(--text-color-secondary)"};
    padding: 0 5px;
    margin-top: -8px;
  }

  .add-btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
  }

  /* TABLA DE DETALLES */
  .detail-table-container {
    background-color: ${(props) => props.theme.colors.cardBg || "white"};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid ${(props) => props.theme.colors.border || "var(--surface-border)"};
  }

  .header-detail {
    background-color: ${(props) => props.theme.colors.primary || "var(--app-primary)"};
    color: white;
    display: grid;
    grid-template-columns: 50px 1.5fr 2fr 0.8fr 1fr 1fr 50px;
    padding: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    align-items: center;
    text-align: center;
  }

  .detail-list {
    max-height: 200px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.colors.border || "var(--surface-hover)"};
      border-radius: 4px;
    }
  }

  .detail-item {
    display: grid;
    grid-template-columns: 50px 1.5fr 2fr 0.8fr 1fr 1fr 50px;
    padding: 6px 8px;
    border-bottom: 1px solid
      var(--surface-border);
    align-items: center;
    text-align: center;
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text || "inherit"};

    &:hover {
      background-color: ${(props) => props.theme.colors.hoverBg || "var(--surface-card)"};
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .footer-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid ${(props) => props.theme.colors.border || "var(--surface-border)"};
  }

  /* BARRA DE INFO DE PAGO */
  .info-payment-container {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 0.6rem 1rem;
    background-color: ${(props) => props.theme.colors.surface || "var(--surface-card)"};
    border-radius: 6px;
    margin-top: 5px;
    border: 1px solid ${(props) => props.theme.colors.border || "var(--surface-border)"};
  }

  .info-tag {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.textSecondary || "var(--text-color)"};

    &.highlight {
      color: ${(props) => props.theme.colors.primary || "var(--app-primary)"};

      .info-value {
        color: ${(props) => props.theme.colors.text || "var(--app-primary)"};
        background-color: ${(props) => props.theme.colors.hoverBg || "var(--highlight-bg)"};
        padding: 2px 6px;
        border-radius: 4px;
      }
    }
  }

  .info-label {
    font-weight: 600;
  }

  .info-value {
    font-weight: 700;
  }
`;
