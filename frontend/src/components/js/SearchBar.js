import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/SearchBar.css";

export default function SearchBar({onSearch, searchText}) {

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="admin-search">
      <span className="atm-heading">ATM List</span>
      <div className="search-field">
        <div class="search-input">
          <FontAwesomeIcon icon={faSearch} className="search-icon"/>
          <input
            type="text"
            id="search"
            placeholder="Search by atm id"
            value={searchText}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
