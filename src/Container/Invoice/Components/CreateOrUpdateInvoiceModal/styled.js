import styled from "styled-components";

export const CreateOrUpdateInvoiceModalStyled = styled.div`
  overflow-y: auto;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background || "#f8f9fa"};

  /* SECCIONES (Tarjetas) - COMPACTO */
  .section-card {
    background-color: ${(props) => props.theme.colors.cardBg || "white"};
    padding: 0.6rem 1rem;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors.border || "#e0e0e0"};
  }

  .section-title {
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.text || "#002147"};
    margin-bottom: 0.5rem;
    display: block;
    border-bottom: 1px solid
      ${(props) => props.theme.colors.border || "#f0f0f0"};
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
    align-items: center;
    margin-bottom: 0.5rem;
    padding-bottom: 0.2rem;
  }

  /* Hacer que Tipo de Ingreso (1) y Descripción (2) sean más anchos */
  .detail-fields > div:nth-child(1),
  .detail-fields > div:nth-child(2) {
    grid-column: span 2;
  }

  .detail-fields .p-checkbox {
    margin-top: 15px;
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
    color: ${(props) => props.theme.colors.textSecondary || "#666"};
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
    border: 1px solid ${(props) => props.theme.colors.border || "#e0e0e0"};
  }

  .header-detail {
    background-color: ${(props) => props.theme.colors.primary || "#002147"};
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
      background-color: ${(props) => props.theme.colors.border || "#ccc"};
      border-radius: 4px;
    }
  }

  .detail-item {
    display: grid;
    grid-template-columns: 50px 1.5fr 2fr 0.8fr 1fr 1fr 50px;
    padding: 6px 8px;
    border-bottom: 1px solid
      ${(props) => props.theme.colors.border || "#f0f0f0"};
    align-items: center;
    text-align: center;
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text || "inherit"};

    &:hover {
      background-color: ${(props) => props.theme.colors.hoverBg || "#f9fbfd"};
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
    border-top: 1px solid ${(props) => props.theme.colors.border || "#e0e0e0"};
  }

  /* BARRA DE INFO DE PAGO */
  .info-payment-container {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 0.6rem 1rem;
    background-color: ${(props) => props.theme.colors.surface || "#f1f3f5"};
    border-radius: 6px;
    margin-top: 5px;
    border: 1px solid ${(props) => props.theme.colors.border || "#e9ecef"};
  }

  .info-tag {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.textSecondary || "#495057"};

    &.highlight {
      color: ${(props) => props.theme.colors.primary || "#002147"};

      .info-value {
        color: ${(props) => props.theme.colors.text || "#0d47a1"};
        background-color: ${(props) => props.theme.colors.hoverBg || "#e3f2fd"};
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
