import styled from "styled-components";

export const SpendingInvocesStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .search-sticky {
    position: sticky;
    top: 0;
    z-index: 5;
    background: var(--surface-card);
    padding: 4px 0 8px;
  }

  .search-box {
    position: relative;
    width: 100%;

    .pi-search {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-color-secondary);
      pointer-events: none;
      z-index: 1;
    }

    .p-inputtext {
      width: 100%;
      min-height: 42px;
      padding-left: 36px !important;
      padding-right: 40px !important;
      border-radius: 10px !important;
    }
  }

  .search-clear-btn {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--text-color-secondary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .cards-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .item-invoice {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 14px;
    background-color: var(--surface-section);
    border: 1px solid var(--surface-border);
    box-shadow: var(--app-shadow-sm);
    border-radius: 14px;
    transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease;

    @media (hover: hover) {
      &:hover {
        border-color: var(--app-control-border);
        box-shadow: var(--app-shadow-md);
      }
    }
  }

  .item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .item-top-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .invoiceno {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 9999px;
    background: var(--app-success-soft, rgba(46, 125, 50, 0.15));
    color: var(--app-success, #2e7d32);
    font-size: 0.78rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .item-date {
    font-size: 0.78rem;
    color: var(--text-color-secondary);
    white-space: nowrap;
  }

  .item-amount {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-color);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .item-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .item-info {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: left;
  }

  .item-vendor {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-meta {
    font-size: 0.8rem;
    color: var(--text-color-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-actions {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .icon-btn {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    border-radius: 10px;
    border: 1px solid var(--surface-border);
    background: var(--surface-card);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.15s ease, background-color 0.2s ease;

    &:active:not(:disabled) {
      transform: scale(0.95);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }

  .icon-btn--print {
    color: var(--app-warning, #f59e0b);
  }

  .icon-btn--delete {
    color: var(--app-error, #ef4444);
  }
`;
