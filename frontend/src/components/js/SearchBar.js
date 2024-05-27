import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/SearchBar.css";
import { useState } from "react";

export default function SearchBar({onSearch, searchText}) {
  const [inputText, setInputText] = useState('');

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
