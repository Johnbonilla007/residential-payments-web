import styled from "styled-components";

export const PermissionStyled = styled.div`
  .item-rol {
    box-shadow: var(--app-shadow-md);
    margin: 8px;
    transition: transform 0.3s ease;

    .title {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: 44px 1fr 44px;
      background-color: rebeccapurple;
      color: var(--primary-color-text);
      padding: 6px;
      gap: 6px;

      .delete,
      .edit {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--surface-card);
        width: 36px;
        height: 36px;
        border-radius: 10px;
        cursor: pointer;

        &:hover {
          background-color: var(--surface-hover);
        }
      }
    }

    @media (hover: hover) {
      &:hover {
        transform: scale(1.02);
      }
    }
  }

  .main-content-item {
    overflow-y: auto;
    max-height: 70vh;

    .item-permission {
      display: flex;
      align-items: stretch;
      box-shadow: var(--app-shadow-md);
      margin: 10px 4px;
      border-radius: 8px;
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      transition: transform 0.3s ease;

      .title {
        background-color: var(--app-primary);
        padding: 10px 14px;
        margin-right: 10px;
        flex: 0 1 260px;
        min-width: 140px;
        box-shadow: var(--app-shadow-sm);
        color: var(--primary-color-text);
        font-size: 1rem;
        word-break: break-word;
      }

      .description {
        display: flex;
        align-items: center;
        flex: 1 1 auto;
        min-width: 0;
        padding: 8px;
      }

      .delete,
      .edit {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 44px;
        min-height: 44px;
        cursor: pointer;

        &:hover {
          background-color: var(--surface-hover);
        }
      }

      @media (hover: hover) {
        &:hover {
          transform: scale(1.005);
        }
      }

      @media (max-width: 767px) {
        flex-wrap: wrap;

        .title {
          flex: 1 1 100%;
          margin-right: 0;
        }

        .description {
          flex: 1 1 auto;
        }
      }
    }
  }
`;
