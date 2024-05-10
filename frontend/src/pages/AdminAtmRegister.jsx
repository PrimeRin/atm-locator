import { useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import AtmHeader from "../components/js/AtmHeader";
import CustomStepper from "../components/js/CustomStepper";
import RegisterForm from "../components/js/RegisterForm";
import "../components/css/AtmHeader.css";
import "../components/css/CustomStepper.css";

function AdminAtmRegister() {
  const [page, setPage] = useState(1);

  function handleStepper() {
    setPage(page + 1);
  }

  function handleBack(){
    setPage(page -1);
  }

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
          text={"REGISTER ATM"}
          showThreeDot={false}
        />
        <div className="admin-atm-edits-form-con">
          <CustomStepper page={page} />
          <RegisterForm page={page} onNext={handleStepper} onBack={handleBack}/>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAtmRegister;
