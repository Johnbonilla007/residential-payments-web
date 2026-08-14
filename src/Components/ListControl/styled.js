import styled from "styled-components";

export const ListControlStyled = styled.div`
  .list-control {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 50px;
    background-color: var(--surface-section);
    border-right: 1px solid var(--surface-border);
    padding: 10px;
    box-shadow: var(--app-shadow-sm);
    overflow-y: auto;
    transition:
      background-color var(--transition-base),
      border-color var(--transition-base);
  }

  .list-control ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .list-control li {
    padding: 10px;
    border-bottom: 1px solid var(--surface-border);
    transition: background-color var(--transition-fast);
  }

  .list-control li:hover {
    background-color: var(--surface-hover);
    cursor: pointer;
  }

  .container-items {
    background-color: var(--surface-card);
    height: calc(100% - 40px);
    border-radius: var(--radius-lg);
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--app-primary) var(--surface-card);
  }
`;
