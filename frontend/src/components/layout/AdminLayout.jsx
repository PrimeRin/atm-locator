import { useState } from "react";
import Header from "../js/Header";
import Sidebar from "../js/Sidebar";
import "../css/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState('admin-dashboard');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleTabClick = (tab) => {
    setActive(tab);
    navigate(`/${tab}`); 
  };
  
  return (
    <div className="grid-container">
      <Header />
      <Sidebar
        active={active}
        activeTabName={"admin-dashboard"}
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        handleTabClick={handleTabClick}
      />
      {children}
    </div>
  );
};

export default AdminLayout;
