// AdminLayout.js
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../js/UserContext";
import Header from "../js/Header";
import Sidebar from "../js/Sidebar";
import PageNotFound from "../js/PageNotFound";
import "../css/AdminDashboard.css";

const AdminLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleTabClick = (tab) => {
    navigate(`/${tab}`);
  };

  return (
    <>
      {user ? (
        <div className="grid-container">
          <Header user={user}/>
          <Sidebar
            activeTabName={"admin-dashboard"}
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
            handleTabClick={handleTabClick}
            user={user}
          />
          {children}
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default AdminLayout;
