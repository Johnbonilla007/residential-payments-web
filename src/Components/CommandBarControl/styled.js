import styled from "styled-components";
import { media } from "../../Styles/themes";

const commandButton = `
  background: none;
  border: 1px solid transparent;
  color: var(--text-color);
  height: 32px;
  width: 185px;
  cursor: pointer;
  font-size: 12px;
  border-radius: var(--radius-sm);
  box-shadow: var(--app-shadow-sm);
  margin-right: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    color var(--transition-fast);

  .icon {
    border-right: 1px solid var(--surface-border);
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: border-color var(--transition-fast);
  }

  .title {
    width: 100%;
    font-size: 10pt;
    text-align: left;
    padding-left: 8px;
  }
`;

export const CommandBarControlStyled = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--surface-section);
  border-bottom: 1px solid var(--surface-border);
  color: var(--text-color);
  padding: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  z-index: 1000;
  box-shadow: var(--app-shadow-sm);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base);

  .command-button-disabled {
    ${commandButton}
    opacity: 0.5;
    pointer-events: none;
  }

  .command-button {
    ${commandButton}
  }

  .command-button:hover {
    background-color: var(--surface-hover);
    border-color: var(--surface-border);

    .icon {
      border-right-color: var(--text-color-secondary);
    }
  }

  .command-button:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  /* Buttons take the full row on narrow screens instead of overflowing. */
  ${media.sm} {
    .command-button,
    .command-button-disabled {
      width: 100%;
      margin-right: 0;
    }
  }
`;
