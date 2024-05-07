import React from "react";
import "../css/LabeledInputXL.css";

export default function LabeledInputXL({ label, type, value, onChange, name, placeholder }) {
  return (
    <div className="labeled-input-xl">
      <label>{label}</label>
      <input type={type} value={value} name={name} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
