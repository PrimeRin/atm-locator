import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { RiGlobalLine } from "react-icons/ri";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import "../css/AtmList.css";
import { useState } from "react";
import DeleteWarning from "./DeleteWarning";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteAtm } from "../service/deleteAtm";

export default function AtmList({ atm, onSelect }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigateEdit = () => {
    const currentPath = location.pathname;
    const newPath = `${currentPath}/${atm.id}/edit`;
    navigate(newPath);
  };

  function toggleDropDown() {
    setShowDropdown(!showDropdown);
  }

  function toggleDeleteWarning() {
    toggleDropDown();
    setShowDeleteWarning(!showDeleteWarning);
  }

  async function Delete() {
    try {
      const result = await deleteAtm(atm.id);
      console.log(result);
      toggleDeleteWarning();
      onSelect(null);
    } catch (error) {}
    const errorMessage = 'An unknown error occurred';
    console.error(errorMessage);
  }

  return (
    <div className="atmlist-con">
      <div className="atm-top">
        <span className="atm-id">{atm.id}</span>
        <FontAwesomeIcon
          icon={faEllipsisV}
          onClick={toggleDropDown}
          className="icon"
        />
      </div>

      {showDropdown && (
        <div className="list-dropdown-menu">
          <div className="list-dropdown-item-con" onClick={navigateEdit}>
            <MdOutlineModeEdit size={25} />
            <span className="list-atm-edit-btn">Edit</span>
          </div>
          <div
            className="list-dropdown-item-con"
            onClick={setShowDeleteWarning}
          >
            <MdDeleteOutline size={25} />
            <span className="list-atm-edit-btn">Delete</span>
          </div>
        </div>
      )}

      {showDeleteWarning && (
        <DeleteWarning
          onCancel={toggleDeleteWarning}
          onDeleteConfirm={Delete}
        />
      )}

      <div className="atm-bottom" onClick={() => onSelect(atm)}>
        <div className="location">
          <span>{atm.name}</span>
        </div>

        <div className="contact-details">
          <span>{atm.category}</span>
          <div className="inner-contact-details">
            <div className="email">
              <RiGlobalLine icon={faEnvelope} className="icon" />
              <span>{atm.website}</span>
            </div>
            <div className="phone">
              <MdOutlineLocalPhone icon={faPhone} className="icon" />
              <span>{atm.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
