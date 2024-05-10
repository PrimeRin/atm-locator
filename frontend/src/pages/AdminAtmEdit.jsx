import AdminLayout from "../components/layout/AdminLayout";
import AtmHeader from "../components/js/AtmHeader";
import { useState } from "react";
import CustomStepper from "../components/js/CustomStepper";
import RegisterForm from "../components/js/RegisterForm";
import Details from "../components/js/Details";
import "../components/css/AtmHeader.css";
import "../components/css/CustomStepper.css";

function AdminAtmEdit() {
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
          <CustomStepper />
          <RegisterForm />
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAtmEdit;
