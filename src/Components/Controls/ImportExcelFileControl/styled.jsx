import styled from "styled-components";

export const ImportExcelFileControlStyled = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 220px;
    cursor: pointer;
  }

  .buttom {
    background: var(--app-nav-gradient);
    padding: 20px;
    color: var(--app-nav-text);
    border-radius: var(--radius-lg);
    font-weight: 700;
    font-size: 15pt;
    text-align: center;
    width: 100%;
    transition:
      box-shadow var(--transition-fast),
      transform var(--transition-fast),
      filter var(--transition-fast);

    &:hover {
      box-shadow: var(--app-shadow-md);
      filter: brightness(1.08);
    }

    /* Settle without resizing: changing padding here would reflow the form. */
    &:active {
      transform: translateY(1px);
    }
  }

  .item-content {
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr) 20px;
    gap: 8px;
    align-items: center;
    background-color: var(--highlight-bg);
    color: var(--highlight-text-color);
    padding: 20px;
    width: 100%;
    max-width: 280px;
    border-radius: var(--radius-lg);
    margin: 10px;
  }
`;
