import styled from "styled-components";

export const CreateOrUpdateInvoiceModalStyled = styled.div`
  padding: 0.75rem 1rem 1rem;
  background-color: ${(props) => props.theme.colors.background || "var(--surface-card)"};

  .wizard-steps {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
    margin-bottom: 0.85rem;
  }

  .wizard-step-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.55rem 0.65rem;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.border || "var(--surface-border)"};
    background-color: ${(props) => props.theme.colors.cardBg || "var(--surface-card)"};
    color: ${(props) => props.theme.colors.textSecondary || "var(--text-color-secondary)"};
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .step-num {
      width: 22px;
      height: 22px;
      min-width: 22px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      background: rgba(148, 163, 184, 0.2);
    }

    &.active {
      border-color: var(--color-primary, var(--app-primary, #3b82f6));
      color: var(--text-color);
      background: color-mix(in srgb, var(--color-primary, #3b82f6) 14%, var(--card-bg));

      .step-num {
        background: var(--color-primary, var(--app-primary, #3b82f6));
        color: #ffffff;
      }
    }

    &.done:not(.active) .step-num {
      background: #10b981;
      color: #ffffff;
    }
  }

  .step-summary-pill {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.55rem 0.85rem;
    margin-bottom: 0.65rem;
    border-radius: 10px;
    background: var(--surface-section, rgba(148, 163, 184, 0.1));
    border: 1px solid ${(props) => props.theme.colors.border || "var(--surface-border)"};
    font-size: 0.84rem;
    color: var(--text-color);
  }

  .summary-total-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    background: color-mix(in srgb, #10b981 12%, var(--card-bg));
    border: 1px solid color-mix(in srgb, #10b981 35%, transparent);
    margin-bottom: 0.75rem;

    .summary-total-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-color-secondary);
    }

    .summary-total-value {
      font-size: 1.2rem;
      font-weight: 700;
      color: #10b981;
    }
  }

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
    gap: 0.9rem 1rem;
    align-items: center;
    padding-top: 0.35rem;
  }

  /* DETALLES DE FACTURA - Grid Compacto */
  .detail-fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.75rem 0.65rem;
    /* Alineado arriba para que el textarea (más alto) no descentre la fila. */
    align-items: start;
    margin-bottom: 0.5rem;
    padding-top: 0.35rem;
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
    margin-top: 6px;

    > label {
      background-color: ${(props) => props.theme.colors.cardBg || "var(--card-bg, #fff)"};
      padding: 0 5px;
      font-size: 0.8rem;
      font-weight: 500;
      border-radius: 4px;
    }
  }

  .p-inputtext,
  .p-dropdown,
  .p-calendar,
  .p-inputnumber,
  textarea {
    width: 100% !important;
    border-radius: 8px;
  }

  .p-inputtext,
  .p-dropdown {
    min-height: 42px;
  }

  textarea.p-inputtext {
    min-height: 48px;
    padding: 0.65rem 0.75rem;
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

  @media (max-width: 767px) {
    padding: 0.5rem 0.65rem 0.75rem;

    .wizard-step-btn {
      padding: 0.45rem 0.4rem;
      font-size: 0.75rem;
      gap: 0.3rem;
    }

    .header-detail {
      display: none;
    }

    .detail-item {
      grid-template-columns: minmax(0, 1fr) auto;
      text-align: left;
      gap: 0.25rem 0.5rem;
      padding: 0.65rem 0.75rem;

      & > div:nth-child(1) {
        display: none;
      }

      & > div:nth-child(2) {
        font-size: 0.75rem;
        color: var(--text-color-secondary);
      }

      & > div:nth-child(3) {
        grid-column: 1 / -1;
        font-weight: 600;
      }

      & > div:nth-child(4),
      & > div:nth-child(5) {
        font-size: 0.8rem;
        color: var(--text-color-secondary);
      }

      & > div:nth-child(6) {
        font-weight: 700;
        color: #10b981;
      }

      & > div:nth-child(7) {
        grid-column: 2;
        grid-row: 1;
        justify-self: end;
      }
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
