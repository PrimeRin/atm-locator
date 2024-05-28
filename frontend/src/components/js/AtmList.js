import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { RiGlobalLine } from "react-icons/ri";
import {
  MdOutlineLocalPhone,
  MdOutlineModeEdit,
  MdDeleteOutline,
} from "react-icons/md";
import "../css/AtmList.css";
import DeleteWarning from "./DeleteWarning";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteAtm } from "../service/deleteAtm";
import Notice from "./Notice";

export default function AtmList({ atm, onSelect, onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [type, setType] = useState("none");
  const [message, setMessage] = useState(null);
  const [showNotice, setShowNotice] = useState(false);

  const navigateEdit = () => {
    const currentPath = location.pathname;
    const newPath = `${currentPath}/${atm.id}/edit`;
    navigate(newPath);
  };

  function toggleDropDown() {
    setShowDropdown(!showDropdown);
  }

  function toggleDeleteWarning() {
    setShowDropdown(false);
    setShowDeleteWarning(!showDeleteWarning);
  }

  async function handleDelete() {
    try {
      console.log('atm id.....', atm.id);
      await deleteAtm(atm.id);
      setMessage("ATM deleted successfully!");
      setType("success");
      setShowNotice(true);
      toggleDeleteWarning();
      onDelete(atm.id);
      setTimeout(() => {
        navigate("/admin-atm-list");
        setShowNotice(false);
      }, 2000);
    } catch (error) {
      setMessage("An unknown error occurred");
      console.log(error);
      toggleDeleteWarning();
      setType("error");
      setShowNotice(true);
      setTimeout(() => {
        setShowNotice(false);
      }, 2000);
    }
  }

  return (
    <>
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
              onClick={() => setShowDeleteWarning(true)}
            >
              <MdDeleteOutline size={25} />
              <span className="list-atm-edit-btn">Delete</span>
            </div>
          </div>
        )}

        {showDeleteWarning && (
          <DeleteWarning
            onCancel={toggleDeleteWarning}
            onDeleteConfirm={handleDelete}
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
      <Notice type={type} message={message} showNotice={showNotice} />
    </>
  );
}
