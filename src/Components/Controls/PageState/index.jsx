import React from "react";
import styled from "styled-components";
import { Button } from "primereact/button";

const StateWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
  gap: 10px;
  background: var(--surface-card);
  border: 1px dashed var(--surface-border);
  border-radius: var(--radius-lg);
  color: var(--text-color);
`;

const IconCircle = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  background: ${(props) =>
    props.$variant === "error"
      ? "var(--app-error-soft)"
      : "var(--surface-hover)"};
  color: ${(props) =>
    props.$variant === "error"
      ? "var(--app-error)"
      : "var(--text-color-secondary)"};
`;

const StateTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
`;

const StateMessage = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  max-width: 34ch;
`;

/**
 * Shared empty / error / loading state panel.
 */
export const PageState = ({
  icon = "pi pi-inbox",
  title,
  message,
  action,
  variant = "empty",
}) => {
  return (
    <StateWrap role={variant === "error" ? "alert" : "status"}>
      <IconCircle $variant={variant} aria-hidden="true">
        <i className={icon} />
      </IconCircle>
      {title && <StateTitle>{title}</StateTitle>}
      {message && <StateMessage>{message}</StateMessage>}
      {action && (
        <Button
          type="button"
          label={action.label}
          icon={action.icon}
          onClick={action.onClick}
          className="p-button-sm p-button-outlined"
          style={{ minHeight: "44px", marginTop: "4px" }}
        />
      )}
    </StateWrap>
  );
};

export default PageState;
