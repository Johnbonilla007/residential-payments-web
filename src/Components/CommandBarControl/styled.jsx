import styled from "styled-components";
import { media } from "../../Styles/themes";

const commandButton = `
  background: none;
  border: 1px solid transparent;
  color: var(--text-color);
  height: 32px;
  /* Grows to fill the row and shrinks on narrow screens; a fixed 185px forced
     the bar wider than its container. */
  flex: 0 1 185px;
  min-width: 0;
  max-width: 100%;
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

  .icon {
    flex: 0 0 auto;
  }

  .title {
    min-width: 0;
    font-size: 10pt;
    text-align: left;
    padding-left: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  ${media.md} {
    .command-button,
    .command-button-disabled {
      flex: 1 1 100%;
      margin-right: 0;
    }
  }
`;
