import React from "react";
import "../css/Dropdown.css";

function Dropdown({ label, options, value, onChange, disabled}) {
  return (
    <div className="dropdown">
      <label className="dropdown-label">{label}</label>
      <select className="dropdown-select" value={value} onChange={onChange}>
        <option value=""></option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.value === 'default'}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
