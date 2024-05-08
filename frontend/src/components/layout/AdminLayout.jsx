import { useState } from "react";
import Header from "../js/Header";
import Sidebar from "../js/Sidebar";
import "../css/AdminDashboard.css";

const AdminLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      {children}
    </div>
  );
};

export default AdminLayout;
