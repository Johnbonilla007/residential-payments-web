import styled from "styled-components";

export const SpendingInvocesStyled = styled.div`
  .item-invoice {
    display: grid;
    grid-template-columns: 20% 40% 10% 15% 5% 5% 5%;
    margin: 5px;
    background-color: white;
    box-shadow: 1px 1px 4px #00000090;
    border-radius: 5px;
    div {
      display: flex;
      align-items: center;
      padding: 10px;
      font-weight: 600;
    }
    .invoiceno {
      background-color: #82c294;
      height: 50px;
      display: flex;
      align-items: center;
      border-radius: 5px 0px 0px 5px;
      color: white;
      font-weight: 700;
    }
  }
`;
