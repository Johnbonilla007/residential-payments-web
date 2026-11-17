/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import { utils } from "../../../Helpers/utils";

const SearchWrap = styled.div`
  position: relative;
  width: 100%;

  .p-input-icon-left {
    display: block;
    width: 100%;
  }

  .p-inputtext {
    width: 100%;
    padding-right: ${(props) => (props.$hasValue ? "2.5rem" : "0.75rem")} !important;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
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

export const FilterControl = ({
  filter,
  setFilter,
  items,
  onChange,
  propertyFilter,
  combinedFilterProperties = [],
  placeholder,
}) => {
  const [localFilter, setLocalFilter] = useState(filter || "");

  useEffect(() => {
    setLocalFilter(filter || "");
  }, [filter]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filter !== localFilter) {
        setFilter(localFilter);
      }
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [localFilter]);

  useEffect(() => {
    if (!utils.isNullOrEmpty(filter)) {
      const newItems = items.filter((item) => {
        const doesMatch = (obj, filterProps) => {
          return filterProps.some((property) => {
            if (typeof property === "string") {
              return (
                obj[property] &&
                obj[property]
                  .toString()
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              );
            } else if (typeof property === "object" && property.subItems) {
              const subItems = obj[property.key] || [];
              return subItems.some((subItem) =>
                property.subItems.some(
                  (subProp) =>
                    subItem[subProp] &&
                    subItem[subProp]
                      .toString()
                      .toLowerCase()
                      .includes(filter.toLowerCase()),
                ),
              );
            }
            return false;
          });
        };

        if (combinedFilterProperties.length > 0) {
          const combinedString = combinedFilterProperties
            .map((property) => item[property])
            .join("")
            .toLowerCase();

          if (combinedString.includes(filter.toLowerCase())) {
            return true;
          }
        }

        return doesMatch(item, propertyFilter);
      });

      if (onChange) onChange(newItems);
    } else {
      if (onChange) onChange(items);
    }
  }, [filter, items]);

  return (
    <SearchWrap $hasValue={Boolean(localFilter)}>
      <span className="p-input-icon-left">
        <i className="pi pi-search" aria-hidden="true" />
        <InputText
          type="search"
          value={localFilter}
          onChange={(e) => setLocalFilter(e.target.value)}
          placeholder={placeholder || "Buscar"}
          aria-label={placeholder || "Buscar"}
          enterKeyHint="search"
          autoComplete="off"
        />
      </span>
      {localFilter && (
        <ClearButton
          type="button"
          aria-label="Limpiar búsqueda"
          onClick={() => {
            setLocalFilter("");
            setFilter("");
          }}
        >
          <i className="pi pi-times" aria-hidden="true" />
        </ClearButton>
      )}
    </SearchWrap>
  );
};
