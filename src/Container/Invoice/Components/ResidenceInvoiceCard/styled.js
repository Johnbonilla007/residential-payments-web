import styled from "styled-components";

export const ResidenceInvoiceCardStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  padding: 20px;
  height: 75vh;
  overflow: auto;
  scrollbar-width: thin; /* Para Firefox */
  scrollbar-color: #002147 #fff; /* Para Firefox */
  .residence-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s;
    width: 300px;
    height: ${({ isFromPenaltyFee }) => (isFromPenaltyFee ? "310px" : "310px")};
    margin: 20px;
    cursor: pointer;
    display: flex;
    padding-bottom: 10px;
    flex-direction: column;
  }

  .residence-card:hover {
    transform: scale(1.05);
  }

  .residence-image img {
    width: 100%;
    height: 100px;
    object-fit: contain;
  }

  .residence-content {
    padding: 20px;
    text-align: left;
  }

  .residence-content h3 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
    color: #333;
  }

  .residence-content p {
    margin: 5px 0;
    font-size: 1em;
    color: #666;
  }

  .residence-content p strong {
    color: #333;
  }
`;
