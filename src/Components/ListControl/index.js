import React, { useState } from "react";
import { ListControlStyled } from "./styled";
import SearchControl from "./Components";

const ListControl = ({
  items,
  searchProperty,
  renderItem,
  onSelectItem,
  width,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item[searchProperty].toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div style={{ position: "" }}>
      <ListControlStyled>
        <div
          className="list-control"
          style={{ width: width ? width : "200px" }}
        >
          <SearchControl
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="container-items">
            {filteredItems.map((item, index) => {
              return (
                <div onClick={() => onSelectItem(item)}>
                  {renderItem(item, index)}
                </div>
              );
            })}
          </div>
        </div>
      </ListControlStyled>
    </div>
  );
};

export default ListControl;
