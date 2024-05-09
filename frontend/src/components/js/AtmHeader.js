import React from "react";
import { useState } from "react";
import "../css/AtmHeader.css";
import { SlArrowLeft } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export default function AtmHeader() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="admin-atm-header">
      <div className="back-and-details">
        <div className="back-btn">
          <SlArrowLeft className="back-icon" />
        </div>
        <div className="atm-details"> ATM DETAILS</div>
      </div>
      <BsThreeDotsVertical className="dots-icon" onClick={toggleDropdown} />

      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-item-con">
          <MdOutlineModeEdit size={25} />
            <span className='atm-edit-btn'>Edit</span>
          </div>
          <div className="dropdown-item-con">
          <MdDeleteOutline size={25} />
           <span className='atm-edit-btn'>Delete</span>
          </div>
        </div>
      )}
    </div>
  );
}
