import styled from "styled-components";

const commandButton = `
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  color: var(--text-color);
  min-height: 38px;
  flex: 0 1 auto;
  min-width: 0;
  max-width: 100%;
  padding: 0 12px 0 0;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  border-radius: var(--radius-sm);
  box-shadow: var(--app-shadow-sm);
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    color var(--transition-fast);

  .icon {
    border-right: 1px solid var(--surface-border);
    min-height: 36px;
    width: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto;
    transition: border-color var(--transition-fast);
  }

  .title {
    min-width: 0;
    font-size: 0.875rem;
    text-align: left;
    padding-left: 10px;
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
  padding: 8px 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  z-index: 100;
  box-shadow: var(--app-shadow-sm);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base);

  .command-button-disabled {
    ${commandButton}
    opacity: 0.5;
    cursor: not-allowed;
  }

  .command-button {
    ${commandButton}
  }

  @media (hover: hover) {
    .command-button:hover {
      background-color: var(--surface-hover);
      border-color: var(--app-control-border);

      .icon {
        border-right-color: var(--text-color-secondary);
      }
    }
  }

  .command-button:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  @media (max-width: 767px) {
    position: static;
    padding: 2px 0 8px;
    border-bottom: none;
    background: transparent;
    box-shadow: none;
  }
`;

export const MobileChipBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 2px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MobileChipBtn = styled.button`
  flex: 0 0 auto;
  scroll-snap-align: start;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  color: var(--text-color);
  box-shadow: var(--app-shadow-sm);
  font-size: 0.78rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.2s ease;

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  .chip-icon {
    display: inline-flex;
    align-items: center;
  }
`;
