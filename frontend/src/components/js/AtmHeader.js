import React from "react";
import "../css/AtmHeader.css";
import { SlArrowLeft } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function AtmHeader() {
  return (
    <div className="admin-atm-header">
      <div className="back-and-details">
        <div className="back-btn">
          <SlArrowLeft className="back-icon" />
        </div>
        <div className="atm-details"> ATM DETAILS</div>
      </div>
      <BsThreeDotsVertical className="dots-icon" />
    </div>
  );
}
