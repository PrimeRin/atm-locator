import AdminLayout from "../components/layout/AdminLayout";
import AtmHeader from "../components/js/AtmHeader";
import "../components/css/AtmHeader.css";
import Details from "../components/js/Details";
import { useState } from "react";

function AdminAtmDetails() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const toggleDropdown = (value) => {
    console.log(value);
    setShowDropdown(value);
  };

  const handleCancel = () => {
    setShowWarning(false);
  }

  const handleDeleteConfirm = () => {
    setShowWarning(false);
  }

  return (
    <AdminLayout>
      <div className="admin-atm-details-con">
        <AtmHeader
          showDropdown={showDropdown}
          onSelect={() => toggleDropdown(!showDropdown)}
          showWarning={showWarning}
          onDelete={() => { setShowWarning(true); setShowDropdown(false) }}
          onCancel={handleCancel}
          onDeleteConfirm={handleDeleteConfirm}
          text = {"ATM DETAILS"}
          showThreeDot = {true}
        />
        <Details onSelect={() => toggleDropdown(false)} />
      </div>
    </AdminLayout>
  );
}

export default AdminAtmDetails;
