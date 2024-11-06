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
}) => {
  useEffect(() => {
    if (!utils.isNullOrEmpty(filter)) {
      const newItems = items.filter((item) => {
        // Si `combinedFilterProperties` está definido y no está vacío
        if (combinedFilterProperties.length > 0) {
          const combinedString = combinedFilterProperties
            .map((property) => item[property])
            .join("")
            .toLowerCase();

          return combinedString.includes(filter.toLowerCase()) || 
            propertyFilter.some(
              (property) =>
                item[property] &&
                item[property]
                  .toString()
                  .toLowerCase()
                  .includes(filter.toLowerCase())
            );
        } else {
          // Solo filtra por `propertyFilter`
          return propertyFilter.some(
            (property) =>
              item[property] &&
              item[property]
                .toString()
                .toLowerCase()
                .includes(filter.toLowerCase())
          );
        }
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
          placeholder="Buscar"
        />
      </span>
    </div>
  );
};
