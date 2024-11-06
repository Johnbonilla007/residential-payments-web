import styled from "styled-components";

export const DocumentInvoiceStyled = styled.div`


@media print {
  .invoice-container {
    box-shadow: none;
    border: none;
  }

  .invoice-container h2 {
    font-size: 1.2em;
  }

  .invoice-container.thermal {
    font-size: 0.7em;
  }
}

`;
