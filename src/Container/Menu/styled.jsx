import styled from "styled-components";

export const MenuStyled = styled.div`
  /* Main container with premium styling */
  .container-menu {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    padding: 2.5rem;
    max-width: 1400px;
    margin: 0 auto;
    animation: fadeIn 0.6s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Tablet view */
  @media (max-width: 1024px) {
    .container-menu {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.75rem;
      padding: 2rem;
    }
  }

  /* Mobile landscape */
  @media (max-width: 768px) {
    .container-menu {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      padding: 1.5rem;
    }
  }

  /* Mobile portrait */
  @media (max-width: 480px) {
    .container-menu {
      grid-template-columns: 1fr;
      gap: 1.25rem;
      padding: 1.25rem;
    }
  }

  /* Small mobile devices */
  @media (max-width: 360px) {
    .container-menu {
      gap: 1rem;
      padding: 1rem;
    }
  }
`;
