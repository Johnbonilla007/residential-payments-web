import styled from "styled-components";

export const ResidenceInvoiceCardStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
  height: 75vh;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) #f0f0f0;

  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-gradient);
    border-radius: 10px;
  }
`;

export const CardComponentStyled = styled.div`
  background-color: ${(props) => props.theme.colors.cardBg};
  border-radius: 16px;
  box-shadow: ${(props) => props.theme.colors.cardShadow};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 300px;
  /* Removed max-height to allow content to flow naturally */
  border: 1px solid ${(props) => props.theme.colors.border};
  margin: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  /* Removed max-height to allow content to flow naturally */
  margin: 15px;
  display: flex;
  flex-direction: column;
  position: relative;

  :hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    border-color: var(--color-primary);
  }

  /* Botón flotante mejorado */
  .edit-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;

    .p-button {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: ${(props) => props.theme.colors.surface};
      border: 1px solid ${(props) => props.theme.colors.border};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.25s ease;
      color: ${(props) => props.theme.colors.text};

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

  .residence-content {
    padding: 12px 16px;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .owner-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.text};
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
      color: ${(props) => props.theme.colors.textSecondary};
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
          color: ${(props) => props.theme.colors.textSecondary};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        span {
          font-size: 0.9rem;
          color: ${(props) => props.theme.colors.text};
          font-weight: 600;
        }
      }
    }
  }

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
      min-height: 44px;
      height: auto;
      font-size: 0.85rem;
      border-radius: 8px;
      transition: all 0.2s ease;

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

  /* Responsive Design */
  @media (max-width: 1024px) {
    width: 280px;
    margin: 12px;

    .residence-image {
      height: 100px;
    }

    .residence-content {
      padding: 10px 14px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    margin: 10px auto;

    .residence-image {
      height: 120px;
    }

    .residence-content {
      padding: 14px 16px;

      .residence-details-grid {
        gap: 10px;
      }
    }

    .buttons-container {
      gap: 6px;
      padding: 12px;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 8px 0;
    border-radius: 12px;

    .edit-button .p-button {
      width: 44px;
      height: 44px;
    }

    .residence-image {
      height: 100px;
    }

    .residence-content {
      padding: 12px;

      .owner-title {
        font-size: 0.9rem;
      }

      .residence-name {
        font-size: 0.85rem;
      }

      .residence-details-grid {
        grid-template-columns: 1fr;
        gap: 8px;

        .detail-item {
          strong {
            font-size: 0.7rem;
          }

          span {
            font-size: 0.85rem;
          }
        }
      }
    }

    .buttons-container {
      flex-direction: column;
      gap: 8px;
      padding: 12px;

      button {
        flex: 1 1 100%;
        width: 100%;
        min-width: unset;
        min-height: 48px;
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 360px) {
    .residence-content {
      padding: 10px;
    }

    .buttons-container {
      padding: 10px;

      button {
        font-size: 0.85rem;
      }
    }
  }
`;
