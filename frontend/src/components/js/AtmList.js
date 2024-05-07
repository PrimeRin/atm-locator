import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "../css/AtmList.css";
import { useState } from "react";

export default function AtmList({atm, onSelect}) {
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div className="atmlist-con" onClick={() => onSelect(atm)}>
      <div className="atm-top">
        <span className="atm-id">ATM_ID_{atm.id}</span>
        <FontAwesomeIcon icon={faEllipsisV} onClick={toggleDialog} className="icon" />
        {showDialog && (
          <div className="dialog">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        )}
      </div>
      <div className="location">
        <span>{atm.name}</span>
      </div>
      <div className="contact-details">
        <span>{atm.category}</span>
        <div className="email">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <span>{atm.website}</span>
        </div>
        <div className="phone">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <span>{atm.phone}</span>
        </div>
      </div>
    </div>
  );
}
