import styled from "styled-components";

export const HeaderStyled = styled.div`
  background: rgb(0, 102, 51);
  background: linear-gradient(
    180deg,
    rgba(0, 102, 51, 1) 0%,
    rgba(1, 40, 6, 1) 90%
  );
  padding: 5px;
  box-shadow: 2px 2px 4px #000000;
  .container {
    display: grid;
    grid-template-columns: auto auto auto auto;
    text-align: center;
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .option-menu {
    font-weight: 600;
    margin: 2px;
    padding: 6px;
    border-radius: 10px;
    color: white;
    align-self: center;
    :hover {
      color: #c5c6c8;
    }

    :active {
      color: #888a8a;
    }
  }
  .option-sesion {
    align-self: center;
    font-weight: 600;
    font-size: 10pt;
    margin: 2px;
    padding: 6px;
    color: #b0c2f2;
    text-align: right;
  }
`;
