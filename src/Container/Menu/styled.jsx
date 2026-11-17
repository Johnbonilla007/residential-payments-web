import styled from "styled-components";

export const MenuStyled = styled.div`
  .menu-wrapper {
    max-width: 1120px;
    margin: 0 auto;
    padding: clamp(0.75rem, 2.5vw, 2.25rem);
    animation: fadeIn 0.45s ease-out;
  }

  .dashboard-hero {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
    text-align: left;
  }

  .hero-title {
    margin: 0 0 0.25rem 0;
    font-size: clamp(1.25rem, 2vw, 1.65rem);
    font-weight: 700;
    color: var(--text-color);
    letter-spacing: -0.02em;
  }

  .hero-subtitle {
    margin: 0;
    font-size: 0.9rem;
    color: var(--text-color-secondary);
  }

  .hero-date {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--text-color-secondary);
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 9999px;
    padding: 0.35rem 0.85rem;
    text-transform: capitalize;
    white-space: nowrap;
  }

  /* Main container with balanced 2-column grid on desktop */
  .container-menu {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(1rem, 1.8vw, 1.5rem);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Mobile & narrow tablet */
  @media (max-width: 767px) {
    .menu-wrapper {
      padding: 0.25rem 0;
    }

    .dashboard-hero {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
    }

    .container-menu {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
  }
`;
