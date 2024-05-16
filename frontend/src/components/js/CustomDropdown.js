import React, { useState } from "react";
import "../css/CustomDropdown.css";

const Dropdown = ({ label, options, data }) => {
  const [selectedOption, setSelectedOption] = useState('');

  function handleChange(event){
    setSelectedOption(event.target.value);
  }

  return (
    <div className="dropdown-group">
      <select
        className={`dropdown-field ${selectedOption ? "has-value" : ""}`}
        value={data? data : selectedOption}
        onChange={handleChange}
        required
      >
        <option value="none" disabled>{" "}</option>
        {options.map((option) => (
          <option
            className="register-dropdown-option"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <label className="register-dropdown-label">{label}</label>
    </div>
  );
};

export default Dropdown;
