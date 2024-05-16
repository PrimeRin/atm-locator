import React from "react";
import "../css/Filter.css";
import { dzongkhags } from "./dzongkhags_list";
import { useState, useEffect } from "react";

export default function Filter({ onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    setSelectedFilters(dzongkhags);
    onFilterChange(dzongkhags);
  }, []);

  const handleCheckboxChange = (event) => {
    const dzongkhag = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedFilters([...selectedFilters, dzongkhag]);
    } else {
      setSelectedFilters(
        selectedFilters.filter((filter) => filter !== dzongkhag)
      );
    }

    onFilterChange(selectedFilters);
  };

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
            onChange={handleCheckboxChange}
            checked={selectedFilters.includes(dzongkhag)}
          />
          <label>{dzongkhag}</label>
        </div>
      ))}
    </div>
  );
}
