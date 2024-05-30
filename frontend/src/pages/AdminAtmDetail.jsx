import AdminLayout from "../components/layout/AdminLayout";
import AtmHeader from "../components/js/AtmHeader";
import "../components/css/AtmHeader.css";
import Details from "../components/js/Details";
import { useState, useEffect } from "react";
import { fetchAtmDetails } from "../components/service/atmDetail";
import { useParams } from 'react-router-dom';
import { deleteAtm } from "../components/service/deleteAtm";
import Notice from "../components/js/Notice";
import { useNavigate } from "react-router-dom";

function AdminAtmDetails() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState("none");
  const [message, setMessage] = useState(null);
  const [showNotice, setShowNotice] = useState(false);
  const navigate = useNavigate();
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

  async function handleDeleteConfirm(){
    setShowWarning(false);
    try {
      await deleteAtm(id);
      setMessage("ATM deleted successfully!");
      setType("success");
      setShowNotice(true);
      setTimeout(() => {
        navigate("/admin-atm-list");
        setShowNotice(false);
      }, 2000);
    } catch (error) {
      setMessage("An unknown error occurred");
      setType("error");
      setShowNotice(true);
      setTimeout(() => {
        setShowNotice(false);
      }, 2000);
    }
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
        <Notice message={message} type={type} showNotice={showNotice} />
      </div>
    </AdminLayout>
  );
}

export default AdminAtmDetails;
