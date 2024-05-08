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

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
        <li className={`sidebar-list-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleTabClick('dashboard')}>
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className={`sidebar-list-item ${activeTab === 'atms' ? 'active' : ''}`} onClick={() => handleTabClick('atms')}>
          <a href="">
            <BsFillArchiveFill className="icon" /> ATMS
          </a>
        </li>
        <li className={`sidebar-list-item ${activeTab === 'register-atm' ? 'active' : ''}`} onClick={() => handleTabClick('register-atm')}>
          <a href="">
            <BsFillGrid3X3GapFill className="icon" /> Register ATM
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsPeopleFill className="icon" /> Customers
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsListCheck className="icon" /> Inventory
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
