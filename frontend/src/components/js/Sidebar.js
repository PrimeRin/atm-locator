import React from "react";
import { useState } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import rma_logo from "../../assets/img/rma-logo.png";
import usePath from "./usePath";

function Sidebar({ openSidebarToggle, OpenSidebar, handleTabClick }) {
  const isActive = usePath();

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img src={rma_logo} alt="Logo" className="sidebar-rma-logo" />
          <div className="atm-locator">
            <span>ATM</span>
            <span>LOCATOR</span>
          </div>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className={`sidebar-list-item ${isActive('/admin-dashboard') ? 'active' : ''}`} onClick={() => handleTabClick('admin-dashboard')}>
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className={`sidebar-list-item ${isActive('/admin-atm-list') ? 'active' : ''}`} onClick={() => handleTabClick('admin-atm-list')}>
          <a href="">
            <BsFillArchiveFill className="icon" /> ATMS
          </a>
        </li>
        <li className={`sidebar-list-item ${isActive('/admin-register-atm') ? 'active' : ''}`} onClick={() => handleTabClick('admin-register-atm')}>
          <a href="">
            <BsFillGrid3X3GapFill className="icon" /> Register ATM
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
