import styled from "styled-components";

export const SecurityContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  margin-top: 10px;

  .item {
    height: 100%;
  }
`;
