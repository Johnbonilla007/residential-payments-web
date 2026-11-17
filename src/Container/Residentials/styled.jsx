import styled from "styled-components";

export const ResidentialContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
  padding: clamp(0.5rem, 1.5vw, 1.5rem);
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  .item {
    height: 100%;
    min-width: 0;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 0.25rem 0;
  }
`;
