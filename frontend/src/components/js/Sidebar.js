import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import rma_logo from "../../assets/img/rma-logo.png";
import usePath from "./usePath";
import 
 {BsFillCircleFill}
 from 'react-icons/bs'
 import profile from "../../assets/img/profile.jpeg";
 import { CiLogout } from "react-icons/ci";
 import { useNavigate } from "react-router-dom"; 

function Sidebar({ openSidebarToggle, OpenSidebar, handleTabClick, user}) {
  const isActive = usePath();
  const navigate = useNavigate(); 

  function logOut(){
    localStorage.removeItem('jwtToken');
    navigate("/"); 
  }

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
        <li
          className={`sidebar-list-item ${
            isActive("/admin-dashboard") ? "active" : ""
          }`}
          onClick={() => handleTabClick("admin-dashboard")}
        >
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li
          className={`sidebar-list-item ${
            isActive("/admin-atm-list") ? "active" : ""
          }`}
          onClick={() => handleTabClick("admin-atm-list")}
        >
          <a href="">
            <BsFillArchiveFill className="icon" /> ATMS
          </a>
        </li>
        <li
          className={`sidebar-list-item ${
            isActive("/admin-register-atm") ? "active" : ""
          }`}
          onClick={() => handleTabClick("admin-register-atm")}
        >
          <a href="">
            <BsFillGrid3X3GapFill className="icon" /> Register ATM
          </a>
        </li>
      </ul>

      <div className="profile-and-log-out">

        <div className="profile-header-right">
          <div className="profile-profile-img-con">
            <img src={profile} alt="Logo" className="profile-profile-img" />
            <BsFillCircleFill className="profile-active-dot" size={20} />
          </div>
          <div className="profile-profile-details">
            <span className="profile-profile-name">{user.username}</span>
            <span className="profile-bank-name">{user.bank}</span>
          </div>
        </div>
        
        <div className="log-out-btn-con">
        <CiLogout size={25}/>
        <span className="log-out-btn" onClick={logOut}>
          Log out
        </span>
      </div>
      </div>
      
    </aside>
  );
}

export default Sidebar;
