import React from "react";
import styled from "styled-components";

const ChipsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 2px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChipTouchWrap = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: start;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
`;

const ChipButton = styled.button`
  height: 36px;
  padding: 0 12px;
  border-radius: 9999px;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--app-primary)" : "var(--app-control-border)"};
  background: ${(props) =>
    props.$active ? "var(--highlight-bg)" : "var(--surface-card)"};
  color: ${(props) =>
    props.$active ? "var(--highlight-text-color)" : "var(--text-color)"};
  font-size: 0.8125rem;
  font-weight: ${(props) => (props.$active ? 600 : 500)};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
`;

/**
 * Horizontal scroll-snap filter chip bar with optional leading "Filtros (n)" trigger.
 */
export const FilterChips = ({
  chips = [],
  onOpenSheet,
  activeCount = 0,
  sheetLabel = "Filtros",
}) => {
  return (
    <ChipsRow role="region" aria-label="Filtros rápidos">
      {onOpenSheet && (
        <ChipTouchWrap>
          <ChipButton
            type="button"
            $active={activeCount > 0}
            onClick={onOpenSheet}
          >
            <i className="pi pi-sliders-h" aria-hidden="true" />
            <span>
              {activeCount > 0 ? `${sheetLabel} (${activeCount})` : sheetLabel}
            </span>
          </ChipButton>
        </ChipTouchWrap>
      )}
      {chips.map((chip) => (
        <ChipTouchWrap key={chip.id || chip.label}>
          <ChipButton
            type="button"
            $active={Boolean(chip.active)}
            onClick={chip.onToggle}
            aria-pressed={Boolean(chip.active)}
          >
            {chip.icon && <i className={chip.icon} aria-hidden="true" />}
            <span>
              {chip.label}
              {typeof chip.count === "number" ? ` (${chip.count})` : ""}
            </span>
            {chip.dropdown && (
              <i className="pi pi-chevron-down" aria-hidden="true" />
            )}
          </ChipButton>
        </ChipTouchWrap>
      ))}
    </ChipsRow>
  );
};

export default FilterChips;
