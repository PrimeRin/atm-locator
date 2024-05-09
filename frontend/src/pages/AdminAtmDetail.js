import AdminLayout from "../components/layout/AdminLayout";
import AtmHeader from "../components/js/AtmHeader";
import "../components/css/AtmHeader.css";
import Details from "../components/js/Details";
import { useState } from "react";

function AdminAtmDetails() {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = (value) => {
    console.log(value);
    setShowDropdown(value);
  };

  return (
    <AdminLayout>
      <div className="admin-atm-details-con" >
        <AtmHeader showDropdown={showDropdown} onSelect={()=>toggleDropdown(!showDropdown)} />
        <Details onSelect={()=>toggleDropdown(false)} />
      </div>
    </AdminLayout>
  );
}

export default AdminAtmDetails;
