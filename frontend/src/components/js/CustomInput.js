import React, { useState } from "react";
import "../css/CustomInput.css";

export default function CustomInput({label, value, onType, formData}) {

  function handleOnChange(event){
    onType(value, event.target.value)
  }

  return (
    <div className="input-group">
      <input type="text" required className="input-field" value={formData? formData: ""}  onChange={handleOnChange}/>
      <label className="input-label">{label}</label>
    </div>
  );
}
