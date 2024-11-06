import styled from "styled-components";

export const ImportExcelFileControlStyled = styled.div`
  text-align: -webkit-center;
  margin: 20px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 220px;
    cursor: pointer;
  }
  .buttom {
    background: rgb(38, 98, 205);
    background: linear-gradient(
      180deg,
      rgba(38, 98, 205, 1) 0%,
      rgba(16, 25, 195, 1) 57%,
      rgba(5, 18, 255, 1) 96%
    );
    padding: 20px;
    color: #fff;
    border-radius: 10px;
    font-weight: 700;
    font-size: 15pt;
    :active {
      padding: 18px;
    }
  }
  .item-content {
    display: grid;
    grid-template-columns: 20px 200px 20px;
    align-items: center;
    background-color: #8cb3ff;
    padding: 20px;
    width: 280px;
    border-radius: 10px;
    margin: 10px;
  }
`;
