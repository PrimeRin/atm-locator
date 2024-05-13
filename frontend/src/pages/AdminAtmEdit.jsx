import AdminLayout from "../components/layout/AdminLayout";
import AtmHeader from "../components/js/AtmHeader";
import CustomStepper from "../components/js/CustomStepper";
import RegisterForm from "../components/js/RegisterForm";
import "../components/css/AtmHeader.css";
import "../components/css/CustomStepper.css";
import GroupRegistration from "../components/js/GroupRegistration";

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
          <GroupRegistration/>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAtmEdit;
