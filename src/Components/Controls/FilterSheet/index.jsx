import React from "react";
import styled from "styled-components";
import { Button } from "primereact/button";
import BottomSheet from "../BottomSheet";
import StickyActionBar from "../StickyActionBar";

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .filters {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    min-width: 0;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-color-secondary);
      text-align: left;
      margin: 0;
    }

    .p-dropdown,
    .p-calendar,
    .p-inputtext,
    .p-component {
      width: 100%;
    }

    .p-dropdown,
    .p-calendar .p-inputtext {
      min-height: 44px;
    }

    .selected-residence-container {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;

      .p-inputtext {
        flex: 1;
        min-width: 0;
      }
    }
  }
`;

const SectionWrap = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
`;

const SectionLabel = styled.h4`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color-secondary);
`;

const Section = ({ label, children }) => (
  <SectionWrap>
    {label && <SectionLabel>{label}</SectionLabel>}
    {children}
  </SectionWrap>
);

/**
 * Bottom sheet for mobile filters with sticky "Limpiar / Aplicar" footer.
 */
export const FilterSheet = ({
  visible,
  onHide,
  title = "Filtros",
  onApply,
  onReset,
  applyLabel = "Aplicar",
  resetLabel = "Limpiar",
  children,
}) => {
  const footer = (
    <StickyActionBar inSheet>
      {onReset && (
        <Button
          type="button"
          label={resetLabel}
          className="p-button-outlined p-button-secondary"
          onClick={() => {
            onReset();
          }}
        />
      )}
      <Button
        type="button"
        label={applyLabel}
        icon="pi pi-check"
        style={{ whiteSpace: "nowrap" }}
        onClick={() => {
          onApply?.();
          onHide?.();
        }}
      />
    </StickyActionBar>
  );

  return (
    <BottomSheet visible={visible} onHide={onHide} title={title} footer={footer}>
      <SectionsContainer>{children}</SectionsContainer>
    </BottomSheet>
  );
};

FilterSheet.Section = Section;

export default FilterSheet;
