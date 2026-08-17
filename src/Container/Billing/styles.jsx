import styled from "styled-components";

export const BillingContainerSyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 2rem;

  .item {
    /* Adaptado al tema: antes era 'white' fijo y se veía blanco en modo oscuro. */
    background: var(--surface-card);
    border-radius: 12px;
    padding: 1.25rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid var(--surface-border);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.25rem;
    padding: 1.75rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.25rem;
  }
`;
