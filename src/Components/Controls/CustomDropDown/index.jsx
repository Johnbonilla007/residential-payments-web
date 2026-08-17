import React, { useState, useEffect, useRef } from "react";
import { CustomDropDownStyled } from "./styled";
import { utils } from "../../../Helpers/utils";
import { InputText } from "primereact/inputtext";

const CustomDropDown = ({
  items,
  itemTemplate,
  onChange,
  filterProperties,
  combinedProperties,
  placeholder,
  optionValue,
}) => {
  const [filteredItems, setFilteredItems] = useState(items || []);
  const [filterQuery, setFilterQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (
      !utils.isNullOrEmpty(filterQuery) &&
      (filterProperties?.length > 0 || combinedProperties?.length > 0)
    ) {
      const query = filterQuery.toLowerCase();

      const filtered = items.filter((item) => {
        // Filtra por propiedades simples
        const matchesSimpleProps = filterProperties.some((property) => {
          if (item[property]) {
            return item[property].toString().toLowerCase().includes(query);
          }
          return false;
        });

        // Filtra por propiedades combinadas
        const matchesCombinedProps = combinedProperties.some((combineFunc) => {
          const combinedValue = combineFunc(item).toLowerCase();
          return combinedValue.includes(query);
        });

        return matchesSimpleProps || matchesCombinedProps;
      });

      setFilteredItems(filtered);
    } else {
      setFilteredItems(items); // Si no hay filtro, muestra todos los ítems
    }
  }, [filterQuery, items, filterProperties, combinedProperties]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilter = (event) => {
    setFilterQuery(event.target.value);
  };

  const handleSelect = async (item) => {
    const value = item[optionValue];
    onChange(value);
    setIsOpen(false);
  };

  return (
    <CustomDropDownStyled ref={dropdownRef}>
      <div>
        <InputText
          placeholder={placeholder || ""}
          value={filterQuery}
          onChange={handleFilter}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => {
                handleSelect(item);
                setIsOpen(false);
              }}
            >
              {itemTemplate(item, index)}
            </div>
          ))}
        </div>
      )}
    </CustomDropDownStyled>
  );
};

export default CustomDropDown;
