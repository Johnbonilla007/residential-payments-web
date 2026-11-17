import React from "react";
import styled from "styled-components";
import BottomSheet from "../BottomSheet";

const ActionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ActionButton = styled.button`
  width: 100%;
  min-height: 52px;
  padding: 0 14px;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  background: transparent;
  color: ${(props) =>
    props.$danger ? "var(--app-error)" : "var(--text-color)"};
  font-size: 0.9375rem;
  font-weight: ${(props) => (props.$active ? 600 : 500)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  @media (hover: hover) {
    &:not(:disabled):hover {
      background: var(--surface-hover);
    }
  }
`;

const ActionLeft = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const CancelButton = styled.button`
  width: 100%;
  min-height: 48px;
  margin-top: 8px;
  border-radius: var(--radius-md);
  border: 1px solid var(--surface-border);
  background: var(--surface-section);
  color: var(--text-color);
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
`;

/**
 * Mobile bottom-sheet action menu (replaces overflow popup menus and inline row buttons).
 */
export const ActionSheet = ({
  visible,
  onHide,
  title,
  actions = [],
  cancelLabel = "Cancelar",
}) => {
  const visibleActions = actions.filter(Boolean);

  return (
    <BottomSheet visible={visible} onHide={onHide} title={title}>
      <ActionsList>
        {visibleActions.map((action, index) => (
          <ActionButton
            key={action.id || action.label || index}
            type="button"
            disabled={action.disabled}
            $danger={action.danger}
            $active={action.active}
            onClick={() => {
              onHide?.();
              action.onClick?.();
            }}
          >
            <ActionLeft>
              {action.icon &&
                (typeof action.icon === "string" ? (
                  <i className={action.icon} aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{action.icon}</span>
                ))}
              <span>{action.label}</span>
            </ActionLeft>
            {action.active && (
              <i className="pi pi-check" aria-hidden="true" />
            )}
          </ActionButton>
        ))}
        <CancelButton type="button" onClick={onHide}>
          {cancelLabel}
        </CancelButton>
      </ActionsList>
    </BottomSheet>
  );
};

export default ActionSheet;
