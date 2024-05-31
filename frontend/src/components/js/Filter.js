import React from "react";
import "../css/Filter.css";
import { dzongkhags } from "./dzongkhags_list";
import { useState } from "react";

export default function Filter({ onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState(dzongkhags);
  const [all, setAll] = useState(true);

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
  };

  function toggleAllCheck(){
    if (all){
      setSelectedFilters([]);
    } else {
      setSelectedFilters(dzongkhags);
    }
    setAll(!all);
  }

  onFilterChange(selectedFilters);

  return (
    <div className="admin-filter">
      <span className="atm-heading">Filter By Dzongkhag</span>
      <div className="dzongkhag-con" key='all'>
          <input
            type="checkbox"
            name="all"
            value="all"
            className="filter-item"
            onChange={toggleAllCheck}
            checked={all}
          />
          <label>All</label>
        </div>
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
