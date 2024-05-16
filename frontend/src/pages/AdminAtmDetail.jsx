import AdminLayout from "../components/layout/AdminLayout";
import AtmHeader from "../components/js/AtmHeader";
import "../components/css/AtmHeader.css";
import Details from "../components/js/Details";
import { useState, useEffect } from "react";
import { fetchAtmDetails } from "../components/service/atmDetail";
import { useParams } from 'react-router-dom';

function AdminAtmDetails() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams(); 

  useEffect(() => {
    fetchDataForAtmId(id);
  }, [id]); 

  const fetchDataForAtmId = async (id) => {
    try {
      const fetchedData = await fetchAtmDetails(id);
      setData(fetchedData);
    } catch (error) {
      console.error('Failed to fetch ATM details:', error);
    }
  };
  
  const toggleDropdown = (value) => {
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
        <Details onSelect={() => toggleDropdown(false)} data={data} />
      </div>
    </AdminLayout>
  );
}

export default AdminAtmDetails;
