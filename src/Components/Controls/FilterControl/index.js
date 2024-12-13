/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { utils } from "../../../Helpers/utils";

export const FilterControl = ({
  filter,
  setFilter,
  items,
  onChange,
  propertyFilter,
  combinedFilterProperties = [],
  placeholder,
}) => {
  useEffect(() => {
    if (!utils.isNullOrEmpty(filter)) {
      const newItems = items.filter((item) => {
        // Build a function to check for matches in nested objects or arrays
        const doesMatch = (obj, filterProps) => {
          return filterProps.some((property) => {
            if (typeof property === "string") {
              // Check top-level properties
              return (
                obj[property] &&
                obj[property]
                  .toString()
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              );
            } else if (typeof property === "object" && property.subItems) {
              // Check nested properties (e.g., accounts)
              const subItems = obj[property.key] || [];
              return subItems.some((subItem) =>
                property.subItems.some(
                  (subProp) =>
                    subItem[subProp] &&
                    subItem[subProp]
                      .toString()
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                )
              );
            }
            return false;
          });
        };

        // Check combined properties first
        if (combinedFilterProperties.length > 0) {
          const combinedString = combinedFilterProperties
            .map((property) => item[property])
            .join("")
            .toLowerCase();

          if (combinedString.includes(filter.toLowerCase())) {
            return true;
          }
        }

        // Check top-level and nested properties
        return doesMatch(item, propertyFilter);
      });

      if (onChange) onChange(newItems);
    } else {
      if (onChange) onChange(items);
    }
  }, [filter, items]);

  return (
    <div>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={placeholder || "Buscar"}
        />
      </span>
    </div>
  );
};
