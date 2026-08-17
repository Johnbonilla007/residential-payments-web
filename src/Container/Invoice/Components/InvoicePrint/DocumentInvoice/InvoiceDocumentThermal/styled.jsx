import styled from "styled-components";
import logo from "../../../../../../Assets/Logo.png";

export const InvoiceDocumentThermalStyled = styled.div`
  position: relative;
  border: 2px solid #ccc;
  border-radius: 3px;
  width: 58mm;
  padding: 5px;
  ::before {
    content: "";
    position: absolute;
    top: 150px;
    left: 50px;
    width: 120px;
    height: 120px;
    background-image:  url(${(props) => (props.logoResidential ? props.logoResidential : logo)});
    background-size: contain; /* Ajusta la imagen al contenedor sin cortarla */
    background-position: center; /* Centra la imagen */
    background-repeat: no-repeat; /* Evita que se repita la imagen */
    opacity: 0.1;
    z-index: 1;
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
    align-items: center;
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
      border-radius: 20px;
      height: 40px;
      width: 40px;
      padding: 5px;
      overflow: hidden; /* Asegura que la imagen se recorte dentro del contenedor */
    }

    .logo img {
      object-fit: contain;
      width: 100%; /* Ajusta el ancho de la imagen al contenedor */
      height: 100%; /* Ajusta la altura de la imagen al contenedor */
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
      .signature-item{
        display: grid;
        justify-content: center;
        font-weight: 800;
        text-align: center;
      }
    }
  }
`;
