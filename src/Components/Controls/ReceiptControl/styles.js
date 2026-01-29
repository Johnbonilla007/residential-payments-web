import styled from "styled-components";
import logo from "./../../../Assets/Logo.png";
export const InvoiceDocumentNormalStyled = styled.div`
  position: relative;
  border: 2px solid #ccc;
  border-radius: 3px;
  margin: 10px;
  width: 900px;
  background-color: white; /* Asegurar fondo blanco tipo papel */

  /* Asegurar que el contenido esté sobre la marca de agua */
  & > * {
    position: relative;
    z-index: 2;
  }

  /* Fondo y posición */
  background-color: white;
  /* MARCA DE AGUA (IMG DOM) */
  .watermark-img {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    object-fit: contain;
    opacity: 0.05; /* Muy sutil */
    z-index: 0;
    pointer-events: none;
    filter: grayscale(100%);
  }

  /* CONTENIDO DEL RECIBO (TEXTO) - Siempre encima */
  .header,
  .residential,
  .concepto,
  .payment-way-container,
  .receipt-title {
    position: relative;
    z-index: 10; /* Z-index alto explícito */
    background: transparent; /* Asegurar transparencia para ver marca de agua detrás */
  }

  .header {
    display: grid;
    grid-template-columns: 15% 45% 40%;
    border-bottom: 1px solid #ccc;
    border-radius: 10px 10px 0px 0px;
    .invoice {
      display: flex;
      align-items: center;
      margin-left: 10px;
      color: white;
      font-weight: 700;
    }
    .residential-name {
      width: 200px;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
      text-transform: uppercase;
      text-align: center;
      color: #000;
    }
    .app-name {
      font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
      font-size: 9pt;
      color: #000;
    }
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
    }
    .logo-app {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
    }
  }
  .residential {
    display: grid;
    grid-template-rows: 50px 40px 40px;
    padding-left: 10px;
    padding-right: 10px;
    color: #000;
    .invoice-date-container {
      display: grid;
      justify-content: right;
      margin-right: 30px;
      .invoice-date {
        display: flex;
        div {
          display: flex;
          justify-content: center;
          border: 1px solid #ccc;
          background-color: #002147;
          width: 120px;
          font-weight: 700;
          color: #fff;
        }
      }
      .invoice-date-value {
        display: flex;
        div {
          display: flex;
          justify-content: center;
          border: 1px solid #ccc;
          width: 120px;
        }
      }
    }
    .total {
      display: grid;
      margin-top: 10px;
      width: 100%;
      grid-template-columns: 50% 12% 12% 26%;
      gap: 10px;
      height: 30px;
      .customer {
        display: grid;
        gap: 10px;
        grid-template-columns: 16% 80%;
        justify-content: left;
        align-items: center;
        height: 30px;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
      }
      .block-house {
        display: grid;
        grid-template-columns: 40% 55%;
        gap: 10px;
        justify-content: left;
        align-items: center;
        height: 30px;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
      }
      .house-number {
        display: grid;
        grid-template-columns: 30% 65%;
        gap: 10px;
        justify-content: left;
        align-items: center;
        height: 30px;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
      }
      .total-value {
        display: grid;
        grid-template-columns: 20% 70%;
        justify-content: right;
        align-items: center;
        height: 30px;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        .value {
          border: 1px solid #ccc;
          width: 120px;
          text-align: center;
          padding: 3px;
        }
      }
    }
  }
  .concepto {
    .concepto-container {
      display: flex;
      gap: 10px;
      justify-content: left;
      align-items: center;
      height: 80px;
      width: 900px;
      font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    }
  }
  .payment-way-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
    padding-bottom: 15px;
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    .payment-way {
      display: flex;
      gap: 3px;
    }
    .signature {
      display: grid;
      grid-template-rows: 50% 40%;
      justify-content: right;
      align-items: center;
      margin-right: 10px;
      .signature-item {
        display: grid;
        justify-content: center;
        font-weight: 800;
        text-align: center;
      }
    }
  }
`;
export const InvoiceDocumentThermalStyled = styled.div`
  position: relative;
  border: 2px solid #ccc;
  border-radius: 3px;
  width: 60mm;
  padding: 5px;

  ::before {
    content: "";
    position: absolute;
    top: 150px;
    left: 15px;
    width: 195px;
    height: 130px;
    background-image: url(${(props) =>
      props.logoResidential ? props.logoResidential : logo});
    background-size: contain; /* Ajusta la imagen al contenedor sin cortarla */
    background-position: center; /* Centra la imagen */
    background-repeat: no-repeat; /* Evita que se repita la imagen */
    opacity: 0.1;
    z-index: 0;
    pointer-events: none;
    mix-blend-mode: multiply;
  }

  /* Contenido por encima */
  & > * {
    position: relative;
    z-index: 2;
  }
  .residential-name {
    font-weight: 700;
    font-size: 6pt;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    text-transform: uppercase;
    text-align: center;
    color: #000;
  }
  .header {
    display: grid;
    grid-template-columns: 15% 70% 15%;
    border-bottom: 1px solid #ccc;
    border-radius: 10px 10px 0px 0px;
    .invoice {
      display: flex;
      align-items: center;
      color: white;
      font-weight: 700;
    }

    .app-name {
      font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
      font-size: 9pt;
      color: #000;
    }
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
    }
    .logo-app {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
    }
  }
  .residential {
    display: grid;
    grid-template-rows: 35px 90px;
    color: #000;
    font-size: 6pt;
    .invoice-date-container {
      display: grid;
      justify-content: center;
      height: 15px;
      .invoice-date {
        display: flex;
        div {
          display: flex;
          justify-content: center;
          border: 1px solid #ccc;
          background-color: #002147;
          width: 60px;
          font-weight: 700;
          font-size: 6pt;
          height: 15px;
          color: #fff;
        }
      }
      .invoice-date-value {
        display: flex;
        div {
          display: flex;
          justify-content: center;
          border: 1px solid #ccc;
          width: 60px;
          height: 15px;
          font-size: 6pt;
        }
      }
    }
    .total {
      .customer {
        display: flex;
        gap: 10px;
        height: 20px;
        justify-content: left;
        align-items: center;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
      }
      .block-house {
        display: flex;
        gap: 10px;
        height: 20px;
        justify-content: left;
        align-items: center;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
      }
      .house-number {
        display: flex;
        gap: 10px;
        height: 20px;
        justify-content: left;
        align-items: center;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
      }
      .total-value {
        display: flex;
        gap: 10px;
        height: 20px;
        margin-top: 10px;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        .value {
          border: 1px solid #ccc;
          width: 90px;
          text-align: center;
          padding: 3px;
          margin-left: 16px;
        }
      }
    }
  }
  .concepto {
    color: #000;
    font-size: 6pt;
    .concepto-container {
      display: flex;
      gap: 10px;
      justify-content: left;
      align-items: center;
      height: 80px;
      width: 50mm;
      font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    }
  }
  .payment-way-container {
    color: #000;
    font-size: 6pt;
    justify-content: left;
    align-items: center;
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    .payment-way {
      display: flex;
      gap: 10px;
    }
    .signature {
      display: grid;
      grid-template-rows: 50% 40%;
      justify-content: center;
      margin-top: 50px;
      align-items: center;
      .signature-item {
        display: grid;
        justify-content: center;
        font-weight: 800;
        text-align: center;
      }
      div {
        display: flex;
        justify-content: center;
      }
    }
  }
`;
