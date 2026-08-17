import React, { useState, useEffect, useRef } from "react";
import { CustomDropdownStyled } from "./styled";
import { utils } from "../../../../../../Helpers/utils";
import { InputText } from "primereact/inputtext";

const CustomDropdown = ({ customers, getPaymeType, invoice, setInvoice }) => {
  const [filteredCustomers, setFilteredCustomers] = useState(customers || []);
  const [filterQuery, setFilterQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    if (!utils.isNullOrEmpty(filterQuery)) {
      const query = filterQuery.toLowerCase();
      const filtered = customers.filter((item) => {
        const blockHouse = `${item.block}${item.houseNumber}`.toLowerCase();
        return (
          item.fullName.toLowerCase().includes(query) ||
          blockHouse.includes(query)
        );
      });
      setFilteredCustomers(filtered);
    }
  }, [filterQuery, customers]);

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

  const handleSelect = async (customer) => {
    await getPaymeType(customer);
    setInvoice({
      ...invoice,
      customer: customer.fullName,
      residenceId: customer.residenceId,
      block: customer.block,
      houseNumber: customer.houseNumber,
      residenceNo: customer.residenceNo,
    });

    setIsOpen(false);
  };

  return (
    <CustomDropdownStyled ref={dropdownRef}>
      <div>
        <InputText
          placeholder="Seleccione al cliente"
          value={filterQuery}
          onChange={handleFilter}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {filteredCustomers.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => {
                handleSelect(item);
                setIsOpen(false);
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "70% 15% 15%",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              <div>{item.fullName}</div>
              <div>{item.block}</div>
              <div>{item.houseNumber}</div>
            </div>
          ))}
        </div>
      )}
    </CustomDropdownStyled>
  );
};

export default CustomDropdown;
