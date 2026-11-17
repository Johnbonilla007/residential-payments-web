import React from "react";
import styled from "styled-components";
import { useIsMobile } from "../../../Helpers/useIsMobile";

const FabButton = styled.button`
  position: fixed;
  right: 16px;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  z-index: 950;
  min-width: 56px;
  height: 56px;
  padding: ${(props) => (props.$extended ? "0 20px" : "0 16px")};
  border-radius: 9999px;
  border: none;
  background: var(--app-primary);
  color: var(--primary-color-text);
  box-shadow: var(--app-shadow-lg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring), var(--app-shadow-lg);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }
`;

/**
 * Floating action button rendered only on mobile viewports (<= 767px).
 */
export const Fab = ({
  icon = "pi pi-plus",
  label,
  onClick,
  extended = false,
  disabled = false,
  className = "",
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <FabButton
      type="button"
      onClick={onClick}
      disabled={disabled}
      $extended={extended}
      aria-label={label}
      title={label}
      className={className}
    >
      {typeof icon === "string" ? (
        <i className={icon} aria-hidden="true" />
      ) : (
        <span aria-hidden="true">{icon}</span>
      )}
      {extended && label && <span>{label}</span>}
    </FabButton>
  );
};

export default Fab;
