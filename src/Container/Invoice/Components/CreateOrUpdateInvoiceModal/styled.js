import styled from "styled-components";

export const CreateOrUpdateInvoiceModalStyled = styled.div`
  overflow: auto;
  .header-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    background-color: lightgray;
    box-shadow: 2px 2px 6px #00000090;
    padding: 30px 10px 10px 10px;
    border-radius: 3px;
    margin: 2px;
  }

  .detail-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    background-color: lightgray;
    box-shadow: 2px 2px 6px #00000090;
    padding: 30px 10px 10px 10px;
    border-radius: 3px;
    margin: 10px;
  }

  .header-fields > div {
    flex: 1 1 calc(45% - 1rem);
  }

  .detail-list {
    margin-top: 1rem;
    height: 180px;
    overflow: auto;
    scrollbar-width: thin; /* Para Firefox */
    scrollbar-color: #002147 #fff; /* Para Firefox */
  }

  .detail-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
  }

  .detail-item div {
    flex: 1 1 20%;
    text-align: center;
  }

  .footer-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }
  .header-detail {
    margin-top: 5px;
    background-color: #002147;
    display: grid;
    grid-template-columns: 11% 20% 10% 20% 6% 20% 10%;
    width: 100%;
    color: white;
    padding: 5px;
    border-radius: 10px 10px 0px 0px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
