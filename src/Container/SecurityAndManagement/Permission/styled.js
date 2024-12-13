import styled from "styled-components";

export const PermissionStyled = styled.div`
  .item-rol {
    box-shadow: 2px 2px 6px #00000080;
    margin: 10px;
    transition: 0.4s ease;
    .title {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: 20% 60% 20%;
      background-color: rebeccapurple;
      color: #fff;
      padding:5px;
      .delete{
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        width: 25px;
        height: 25px;
        border-radius: 12px;
        :hover {
          background-color: #ccc;
        }
      }
      .edit{
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        width: 25px;
        height: 25px;
        border-radius: 12px;
        :hover {
          background-color: #ccc;
        }
      }
    }
    :hover {
      scale: calc(1.05);
    }
  }
  .main-content-item {
    overflow: auto;
    height: 70vh;

    .item-permission {
      display: flex;
      box-shadow: 2px 2px 6px #00000080;

      margin: 10px;
      border-radius: 5px;
      transition: 0.4s ease;
      .title {
        background-color: #336ca5;
        padding: 10px;
        margin-right: 10px;
        width: 300px;
        box-shadow: 1px 1px 2px #00000080;
        color: #fff;
        font-size: 12pt;
      }
      .description {
        display: flex;
        align-items: center;
        width: calc(100% - 50px);
      }
      .delete {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        border-radius: 5px 0px 0px 5px;
        :hover {
          background-color: #ccc;
        }
      }
      .edit {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0px 5px 5px 0px;
        width: 50px;
        :hover {
          background-color: #ccc;
        }
      }
      :hover {
        scale: calc(1.01);
      }
    }
  }
`;
