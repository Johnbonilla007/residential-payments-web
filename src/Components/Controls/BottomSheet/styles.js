import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 12000;
  background: var(--maskbg);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overscroll-behavior: contain;
`;

export const SheetPanel = styled.div`
  width: 100%;
  max-width: 560px;
  max-height: ${(props) => props.$maxHeight || "85dvh"};
  background: var(--surface-card);
  color: var(--text-color);
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  box-shadow: var(--app-shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideUp} 180ms cubic-bezier(0.22, 1, 0.36, 1);
  outline: none;
  padding-bottom: env(safe-area-inset-bottom, 0px);
`;

export const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 9999px;
  background: var(--surface-border);
  margin: 10px auto 4px;
  flex-shrink: 0;
`;

export const SheetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px 12px;
  border-bottom: 1px solid var(--surface-border);
  flex-shrink: 0;
`;

export const SheetTitle = styled.h3`
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SheetCloseBtn = styled.button`
  min-width: 44px;
  min-height: 44px;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-color-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
`;

export const SheetBody = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  padding: 12px 16px 16px;
`;

export const SheetFooter = styled.div`
  flex-shrink: 0;
  border-top: 1px solid var(--surface-border);
  background: var(--surface-card);
`;
