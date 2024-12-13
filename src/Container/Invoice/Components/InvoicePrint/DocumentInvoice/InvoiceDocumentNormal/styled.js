import styled from "styled-components";
import logo from "../../../../../../Assets/Logo.png";
export const InvoiceDocumentNormalStyled = styled.div`
  position: relative;
  border: 2px solid #ccc;
  border-radius: 3px;
  margin: 10px;
  width: 1000px;
  align-items: center;
  ::before {
    content: "";
    position: absolute;
    top: 110px;
    left: 400px;
    width: 200px;
    height: 200px;
    background-image:  url(${(props) => (props.logoResidential ? props.logoResidential : logo)});
    background-size: contain; /* Ajusta la imagen al contenedor sin cortarla */
    background-position: center; /* Centra la imagen */
    background-repeat: no-repeat; /* Evita que se repita la imagen */
    opacity: 0.2;
    z-index: 1;
  }
  .header {
    display: grid;
    grid-template-columns: 10% 50% 30% 10%;
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
    display: grid;
    grid-template-columns: 30% 70%;
    gap: 10px;
    justify-content: left;
    align-items: center;
    margin-top: 60px;
    padding-bottom: 10px;
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    .payment-way {
      display: grid;
      grid-template-columns: 36% 65%;
    }
    .signature {
      display: grid;
      grid-template-rows: 50% 40%;
      justify-content: right;
      align-items: center;
      margin-right: 10px;
      .signature-item{
        display: grid;
        justify-content: center;
        font-weight: 800;
        text-align: center;
      }
    }
  }
`;
