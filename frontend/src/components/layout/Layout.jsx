import "../../App.css";
import { useState } from "react";
import NavBar from "../js/NavBar";
import Footer from "../js/Footer";
import Login from "../auth/Login";

const Layout = ({ children }) => {
  const [showLoginDialogBox, setShowLoginDialogBox] = useState(false);

  const handleLoginToggle = () => {
    setShowLoginDialogBox(!showLoginDialogBox);
  };

  return (
    <div className="App" style={{ position: "relative" }}>
      <NavBar showLoginBox={handleLoginToggle} />
      <div className="App-body">
        <div className="login" style={{ position: "absolute", top: "150px", left: "40%", zIndex: 999, display: showLoginDialogBox ? "block" : "none" }}>
          {showLoginDialogBox && <Login />}
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
