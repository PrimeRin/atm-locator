import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/SearchBar.css";
import { useState } from "react";

export default function SearchBar({onSearch}) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    onSearch(inputText);
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
            value={inputText}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
