import styled from "styled-components";

export const PermissionStyled = styled.div`
  .item-rol {
    box-shadow: var(--app-shadow-md);
    margin: 10px;
    transition: 0.4s ease;
    .title {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: 20% 60% 20%;
      background-color: rebeccapurple;
      color: var(--primary-color-text);
      padding:5px;
      .delete{
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: var(--surface-card);
        width: 25px;
        height: 25px;
        border-radius: 12px;
        :hover {
          background-color: var(--surface-hover);
        }
      }
      .edit{
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: var(--surface-card);
        width: 25px;
        height: 25px;
        border-radius: 12px;
        :hover {
          background-color: var(--surface-hover);
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
      box-shadow: var(--app-shadow-md);

      margin: 10px;
      border-radius: 5px;
      transition: 0.4s ease;
      .title {
        background-color: var(--app-primary);
        padding: 10px;
        margin-right: 10px;
        width: 300px;
        box-shadow: var(--app-shadow-sm);
        color: var(--primary-color-text);
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
          background-color: var(--surface-hover);
        }
      }
      .edit {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0px 5px 5px 0px;
        width: 50px;
        :hover {
          background-color: var(--surface-hover);
        }
      }
      :hover {
        scale: calc(1.01);
      }
    }
  }
`;
