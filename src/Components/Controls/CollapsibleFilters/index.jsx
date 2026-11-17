import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ToggleBar = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 8px 14px;
  border-radius: var(--radius-lg, 12px);
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  color: var(--text-color);
  box-shadow: var(--app-shadow-sm);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  @media (hover: hover) {
    &:hover {
      background: var(--surface-hover);
      border-color: var(--app-control-border);
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
`;

const LeftGroup = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const RightGroup = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--app-primary);

  .chevron {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(${(props) => (props.$expanded ? "180deg" : "0deg")});
  }
`;

const Body = styled.div`
  overflow: ${(props) => (props.$expanded ? "visible" : "hidden")};
  max-height: ${(props) => (props.$expanded ? "1600px" : "0px")};
  opacity: ${(props) => (props.$expanded ? 1 : 0)};
  transition:
    max-height 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease;
`;

/**
 * Collapsible filter container so users can hide/show report filters on mobile and PC.
 */
export const CollapsibleFilters = ({
  title = "Filtros",
  defaultExpanded = true,
  children,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Wrapper>
      <ToggleBar
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <LeftGroup>
          <i className="pi pi-sliders-h" aria-hidden="true" />
          <span>{title}</span>
        </LeftGroup>
        <RightGroup $expanded={expanded}>
          <span>{expanded ? "Ocultar filtros" : "Mostrar filtros"}</span>
          <i className="pi pi-chevron-down chevron" aria-hidden="true" />
        </RightGroup>
      </ToggleBar>
      <Body $expanded={expanded} aria-hidden={!expanded}>
        {children}
      </Body>
    </Wrapper>
  );
};

export default CollapsibleFilters;
