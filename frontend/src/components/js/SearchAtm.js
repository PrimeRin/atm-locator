import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/SearchAtm.css";

export default function SearchAtm() {
  return (
    <div className="search-con">
      <span className="heading">Search ATM</span>
      <div className="search-items">
        <div className="search-input-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search By ATM ID"
          />
        </div>
        <button className="create-atm-btn">
          <FontAwesomeIcon  className='plus-icon' icon={faPlus} />
          Create ATM
        </button>
      </div>
    </div>
  );
}
