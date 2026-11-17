import styled from "styled-components";

export const MenuStyled = styled.div`
  /* Main container with premium styling */
  .container-menu {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
    gap: clamp(1rem, 2vw, 2rem);
    padding: clamp(0.75rem, 2vw, 2.25rem);
    max-width: 1440px;
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

  /* Mobile portrait */
  @media (max-width: 767px) {
    .container-menu {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      padding: 0.25rem 0;
    }
  }
`;
