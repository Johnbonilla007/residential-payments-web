import styled from "styled-components";

export const InvoiceStyled = styled.div`
  .search-container {
    background-color: var(--card-bg);
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border-color);

    strong {
      display: block;
      margin-bottom: 1rem;
      color: var(--text-color);
      font-size: 1.1rem;
    }

    /* Asegurar que el filtro ocupe todo el ancho */
    & > div > div {
      width: 100%;
    }
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem;
    max-height: 78vh;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--color-primary, #002147) #f0f0f0;

    /* Custom scrollbar for webkit */
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f0f0f0;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-primary, #002147);
      border-radius: 10px;
    }
  }

  .card {
    background: linear-gradient(to bottom, #ffffff, #fafbfd);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 450px;
    max-height: 550px;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 33, 71, 0.1);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
      border-color: var(--color-primary, #002147);
    }
  }

  .card-image {
    position: relative;

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .edit-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 20px;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 10px;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s ease;
    cursor: pointer;
    z-index: 10;

    &:hover {
      transform: scale(1.15);
      background-color: #84b6f4;
      opacity: 1 !important;
    }
  }

  .card-image:hover .edit-icon {
    opacity: 1;
  }

  .card-content {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;

    .first-row {
      flex: 1;
      margin-bottom: 1rem;

      .card-title {
        font-size: 1.35rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: #1a1a1a;
        line-height: 1.3;
      }

      .card-text {
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
        color: #666;
        line-height: 1.5;
      }
    }
  }

  .secound-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.625rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);

    button {
      flex: 1 1 calc(50% - 0.625rem);
      min-width: 120px;
      font-size: 0.875rem;
      padding: 0.625rem 0.75rem;
      white-space: nowrap;

      &.p-button {
        transition: all 0.2s ease;

        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .card-container {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      padding: 1.25rem;
    }

    .card {
      min-height: 420px;
    }

    .card-image img {
      height: 180px;
    }
  }

  @media (max-width: 768px) {
    .card-container {
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1rem;
      padding: 1rem;
      max-height: 85vh;
    }

    .card {
      min-height: 400px;
    }

    .card-image img {
      height: 160px;
    }

    .card-content .first-row .card-title {
      font-size: 1.2rem;
    }

    .secound-row button {
      font-size: 0.8rem;
      padding: 0.5rem 0.625rem;
    }
  }

  @media (max-width: 480px) {
    .card-container {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 0.875rem;
    }

    .card {
      min-height: auto;
      max-height: none;
    }

    .card-image img {
      height: 140px;
    }

    .secound-row {
      flex-direction: column;
      gap: 0.5rem;

      button {
        flex: 1 1 100%;
        width: 100%;
        min-width: unset;
      }
    }

    .card-content {
      padding: 1rem;

      .first-row .card-title {
        font-size: 1.1rem;
      }

      .first-row .card-text {
        font-size: 0.875rem;
      }
    }
  }
`;
