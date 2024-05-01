import React from 'react';
import "./AtmCategory.css";

export default function AtmCategory({ imageSrc, text, checked, onChange }) {
  return (
    <li className="atm-category">
      <input type="checkbox" checked= {checked} onChange={onChange} style={{ transform: "scale(1.2)" }} />
      <img
        src={imageSrc}
        alt="..."
      />
      &nbsp;&nbsp;{text}
    </li>
  );
}
