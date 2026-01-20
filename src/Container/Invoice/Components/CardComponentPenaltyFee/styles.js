import styled from "styled-components";

export const CardComponentPenaltyFeeStyled = styled.div`
  background: linear-gradient(to bottom, #ffffff, #fafbfd);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 300px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(143, 163, 232, 0.15);

  :hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    border-color: var(--color-primary);
  }

  /* Botón flotante Editar */
  .edit-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;

    .p-button {
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(143, 163, 232, 0.2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.25s ease;

      &:hover:not(:disabled) {
        background: var(--primary-gradient);
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(106, 159, 245, 0.3);

        svg {
          color: white;
        }
      }
    }
  }

  /* Imagen */
  .residence-image {
    width: 100%;
    height: 110px;
    background: linear-gradient(135deg, #e8f0ff, #f0f4ff);
    border-bottom: 1px solid rgba(143, 163, 232, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  /* Contenido */
  .residence-content {
    padding: 12px 16px;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .owner-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-primary);
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;

      .info-icon {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    }

    .residence-name {
      font-size: 0.9rem;
      color: #546e7a;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .residence-details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px dashed rgba(143, 163, 232, 0.2);

      .detail-item {
        display: flex;
        flex-direction: column;

        strong {
          font-size: 0.75rem;
          color: #90a4ae;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        span {
          font-size: 0.9rem;
          color: #37474f;
          font-weight: 600;
        }
      }
    }
  }

  /* Botones */
  .buttons-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    background: linear-gradient(to top, rgba(143, 163, 232, 0.03), transparent);
    border-top: 1px solid rgba(143, 163, 232, 0.08);

    button {
      flex: 1 1 calc(50% - 4px);
      min-width: 120px;
      height: 38px;
      font-size: 0.85rem;
      border-radius: 8px;
      transition: all 0.2s ease;

      &.p-button-success {
        background: linear-gradient(135deg, #81c784, #4caf50);
        border: none;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }
      }

      &.p-button-info {
        background: linear-gradient(135deg, #b3e5fc, #81d4fa);
        border: none;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(129, 212, 250, 0.3);
        }
      }

      &.p-button-primary {
        background: var(--primary-gradient);
        border: none;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 31, 63, 0.3);
        }
      }
    }
  }
`;
