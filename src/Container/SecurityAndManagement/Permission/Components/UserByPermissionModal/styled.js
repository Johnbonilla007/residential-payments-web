import styled from "styled-components";

export const UserByPermissionModalStyled = styled.div`
  .item {
    display: grid;
    grid-template-columns: 20% 76% 4%;
    box-shadow: var(--app-shadow-md);
    margin: 10px;
 
    border-radius: 10px;
    .user {
      display: flex;
      font-size: 14pt;
      font-weight: 700;
      align-items: center;
      background-color:var(--surface-hover);
      padding: 10px;
      border-radius: 10px;
      margin-right: 5px;
    }
    .residential {
      display: flex;
      font-size: 12pt;
      font-weight: 700;
      align-items: center;
    }
    .delete {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      border-radius: 10px;
      width: 30px;
      height: 30px;
      :hover {
        background-color: var(--surface-hover);
      }
    }
  }
`;
