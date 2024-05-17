import React, { useState } from "react";
import "../css/CustomInput.css";

export default function CustomInput({label, key, data, onType, formData}) {

  function handleOnChange(event){
    onType(key, event.target.value)
  }

  return (
    <div className="input-group">
      <input type="text" required className="input-field" value={data? data : formData}  onChange={handleOnChange}/>
      <label className="input-label">{label}</label>
    </div>
  );
}
