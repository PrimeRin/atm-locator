import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/Filter.css";
import { dzongkhags } from "./dzongkhags_list";

export default function Filter() {
  return (
    <div className="admin-filter">
      <span className="atm-heading">Filter By Dzongkhag</span>
      {dzongkhags.map((dzongkhag, index) => (
        <div className="dzongkhag-con" key={index}>
          <input
            type="checkbox"
            name="dzongkhag"
            value={dzongkhag}
            className="filter-item"
          />
          <label>{dzongkhag}</label>
        </div>
      ))}
    </div>
  );
}
