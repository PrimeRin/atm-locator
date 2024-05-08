import React from "react";
import "../css/LabeledInput.css";

export default function LabeledInput({ label, type, value, onChange, name, placeholder }) {
  return (
    <div className="labeled-input">
      <label className="label-input">{label}</label>
      <input className="input-input" type={type} value={value} name={name} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
