import AdminLayout from "../components/layout/AdminLayout";
import AtmHeader from "../components/js/AtmHeader";
import "../components/css/AtmHeader.css";
import "../components/css/CustomStepper.css";
import GroupRegistration from "../components/js/GroupRegistration";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchAtmDetails } from "../components/service/atmDetail";

function AdminAtmEdit() {
  const [data, setData] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    fetchDataForAtmId(id);
  }, [id]); 

  const fetchDataForAtmId = async (id) => {
    try {
      const fetchedData = await fetchAtmDetails(id);
      setData(fetchedData);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch ATM details:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-atm-edits-con">
        <AtmHeader
          showDropdown={false}
          onSelect={() => {}}
          showWarning={false}
          onDelete={() => {}}
          onCancel={() => {}}
          onDeleteConfirm={() => {}}
          text={"EDIT ATM"}
          showThreeDot={false}
        />
        <div className="admin-atm-edits-form-con">
          {data && <GroupRegistration data={data}/>}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAtmEdit;
