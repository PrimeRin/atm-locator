import React, { useState } from "react";
import "../css/CustomInput.css";

export default function CustomInput({label, data}) {
  return (
    <div className="input-group">
      <input type="text" required className="input-field" value={data? data : ''} />
      <label className="input-label">{label}</label>
    </div>
  );
}
