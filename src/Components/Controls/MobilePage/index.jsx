import React, { useState } from "react";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import { useIsMobile } from "../../../Helpers/useIsMobile";
import ActionSheet from "../ActionSheet";
import Fab from "../Fab";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: ${(props) =>
    props.$hasFab
      ? "calc(80px + env(safe-area-inset-bottom, 0px))"
      : "calc(16px + env(safe-area-inset-bottom, 0px))"};
`;

const StickyToolbar = styled.div`
  position: sticky;
  top: -10px;
  z-index: 30;
  background: var(--surface-ground, var(--background-color));
  margin: -10px -12px 0;
  padding: 10px 12px 10px;
  border-bottom: 1px solid var(--surface-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;

  .pi-search {
    position: absolute;
    left: 12px;
    color: var(--text-color-secondary);
    pointer-events: none;
    z-index: 1;
  }

  .p-inputtext {
    min-height: 44px;
    padding-left: 36px !important;
    padding-right: ${(props) => (props.$hasValue ? "44px" : "12px")} !important;
    border-radius: 10px !important;
  }
`;

const ClearBtn = styled.button`
  position: absolute;
  right: 2px;
  min-width: 40px;
  min-height: 40px;
  border: none;
  background: transparent;
  color: var(--text-color-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: 8px;
  }
`;

const IconActionBtn = styled.button`
  flex: 0 0 auto;
  min-width: 44px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid var(--app-control-border);
  background: var(--surface-card);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
`;

/**
 * Mobile scaffold with sticky compact search, filters, refresh/overflow menu,
 * and floating primary FAB. On desktop, renders children untouched with optional desktopHeader.
 */
export const MobilePage = ({
  title,
  desktopHeader,
  search,
  filters,
  fab,
  headerActions = [],
  onRefresh,
  refreshing = false,
  children,
}) => {
  const isMobile = useIsMobile();
  const [actionsOpen, setActionsOpen] = useState(false);

  if (!isMobile) {
    return (
      <>
        {desktopHeader}
        {children}
      </>
    );
  }

  const visibleHeaderActions = headerActions.filter(Boolean);

  return (
    <PageWrapper $hasFab={Boolean(fab)}>
      {title && <h2 className="sr-only">{title}</h2>}
      {(search || filters || onRefresh || visibleHeaderActions.length > 0) && (
        <StickyToolbar>
          {(search || onRefresh || visibleHeaderActions.length > 0) && (
            <SearchRow>
              {search && (
                <SearchBox $hasValue={Boolean(search.value)}>
                  <i className="pi pi-search" aria-hidden="true" />
                  <InputText
                    type="search"
                    value={search.value}
                    onChange={(e) => search.onChange(e.target.value)}
                    placeholder={search.placeholder || "Buscar..."}
                    aria-label={search.placeholder || "Buscar"}
                    enterKeyHint="search"
                    autoComplete="off"
                  />
                  {search.value && (
                    <ClearBtn
                      type="button"
                      aria-label="Limpiar búsqueda"
                      onClick={() => search.onChange("")}
                    >
                      <i className="pi pi-times" aria-hidden="true" />
                    </ClearBtn>
                  )}
                </SearchBox>
              )}
              {onRefresh && (
                <IconActionBtn
                  type="button"
                  onClick={onRefresh}
                  disabled={refreshing}
                  aria-label="Actualizar"
                >
                  <i
                    className={`pi pi-refresh ${refreshing ? "pi-spin" : ""}`}
                    aria-hidden="true"
                  />
                </IconActionBtn>
              )}
              {visibleHeaderActions.length > 0 && (
                <IconActionBtn
                  type="button"
                  onClick={() => setActionsOpen(true)}
                  aria-label="Más opciones"
                >
                  <i className="pi pi-ellipsis-v" aria-hidden="true" />
                </IconActionBtn>
              )}
            </SearchRow>
          )}
          {filters}
        </StickyToolbar>
      )}
      {children}
      {fab && <Fab {...fab} />}
      {visibleHeaderActions.length > 0 && (
        <ActionSheet
          visible={actionsOpen}
          onHide={() => setActionsOpen(false)}
          title={title || "Acciones"}
          actions={visibleHeaderActions}
        />
      )}
    </PageWrapper>
  );
};

export default MobilePage;
