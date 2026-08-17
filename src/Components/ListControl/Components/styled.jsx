import styled from "styled-components";

export const SearchControlStyled = styled.div`
  .search-control {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-sm);
    background-color: var(--surface-section);
    color: var(--text-color);
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  .search-control:focus {
    outline: none;
    border-color: var(--app-primary);
    box-shadow: var(--focus-ring);
  }
`;
