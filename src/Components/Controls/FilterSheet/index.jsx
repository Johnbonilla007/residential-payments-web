import React from "react";
import styled from "styled-components";
import { Button } from "primereact/button";
import BottomSheet from "../BottomSheet";
import StickyActionBar from "../StickyActionBar";

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
