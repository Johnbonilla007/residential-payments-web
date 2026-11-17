import React from "react";
import styled from "styled-components";

const BarRoot = styled.div`
  position: ${(props) => (props.$page ? "fixed" : "sticky")};
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: var(--surface-card);
  border-top: 1px solid var(--surface-border);
  box-shadow: var(--app-shadow-md);
  padding: ${(props) =>
    props.$inSheet
      ? "12px 16px"
      : "12px 16px calc(12px + env(safe-area-inset-bottom, 0px))"};
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 768px) {
    position: ${(props) => (props.$inSheet ? "sticky" : "static")};
    box-shadow: none;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-color);
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;

  & > * {
    min-height: 44px;
  }

  @media (max-width: 767px) {
    & > .p-button,
    & > button {
      flex: 1 1 0;
      min-height: 44px;
      justify-content: center;
    }
  }
`;

/**
 * Sticky bottom action bar for sheets, mobile dialogs, and multi-step forms.
 */
export const StickyActionBar = ({
  summary,
  children,
  inSheet = false,
  page = false,
  className = "",
}) => {
  return (
    <BarRoot $inSheet={inSheet} $page={page} className={className}>
      {summary && <SummaryRow>{summary}</SummaryRow>}
      <ActionsRow>{children}</ActionsRow>
    </BarRoot>
  );
};

export default StickyActionBar;
