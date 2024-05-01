import React, { useState } from "react";
import "../css/NavBar.css";
import rma_logo from "../../assets/img/rma-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <div className="nav-container">
      <div className="left-side">
        <img src={rma_logo} alt="Logo" className="logo" />
        <div className="rma-text">ROYAL MONETARY AUTHORITY</div>
      </div>
      <div className="right-side">
        <div className="country">Bhutan</div>
        <div className="login-btn">
        <FontAwesomeIcon icon={faLock} size="lg"/>
          Login
        </div>
      </div>
    </div>
  );
}
