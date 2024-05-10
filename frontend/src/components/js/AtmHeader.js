import React from "react";
import { useState } from "react";
import "../css/AtmHeader.css";
import { SlArrowLeft } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DeleteWarning from "./DeleteWarning";

export default function AtmHeader({
  showDropdown,
  onSelect,
  showWarning,
  onDelete,
  onCancel,
  onDeleteConfirm,
}) {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate("/admin-atm-list");
  };

  return (
    <div className="admin-atm-header">
      <div className="back-and-details">
        <div className="back-btn">
          <SlArrowLeft className="back-icon" onClick={navigateBack} />
        </div>
        <div className="atm-details"> ATM DETAILS</div>
      </div>
      <BsThreeDotsVertical className="dots-icon" onClick={onSelect} />

      {showDropdown && (
        <div className="dropdown-menu">
          <div className="dropdown-item-con">
            <MdOutlineModeEdit size={25} />
            <span className="atm-edit-btn">Edit</span>
          </div>
          <div className="dropdown-item-con">
            <MdDeleteOutline size={25} />
            <span className="atm-edit-btn" onClick={onDelete}>
              Delete
            </span>
          </div>
        </div>
      )}

      {showWarning && (
        <DeleteWarning onCancel={onCancel} onDeleteConfirm={onDeleteConfirm} />
      )}
    </div>
  );
}
