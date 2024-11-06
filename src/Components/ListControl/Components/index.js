// SearchControl.js
import React from "react";
import { SearchControlStyled } from "./styled";

const SearchControl = ({ searchQuery, setSearchQuery }) => {
  return (
    <SearchControlStyled>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar..."
        className="search-control"
      />
    </SearchControlStyled>
  );
};

export default SearchControl;
