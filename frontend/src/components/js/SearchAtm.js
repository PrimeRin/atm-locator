import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/SearchAtm.css";

export default function SearchAtm() {
  const navigate = useNavigate();

  const handleCreateAtm = () => {
    navigate("/create-atm");
  };

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
        <button className="create-atm-btn" onClick={handleCreateAtm}>
          <FontAwesomeIcon  className='plus-icon' icon={faPlus} />
          Create ATM
        </button>
      </div>
    </div>
  );
}
