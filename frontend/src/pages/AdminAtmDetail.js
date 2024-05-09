import AdminLayout from "../components/layout/AdminLayout";
import AtmHeader from "../components/js/AtmHeader";
import "../components/css/AtmHeader.css";
import Details from "../components/js/Details";

function AdminAtmDetails() {
  return (
    <AdminLayout>
      <div className="admin-atm-details-con">
        <AtmHeader />
        <Details />
      </div>
    </AdminLayout>
  );
}

export default AdminAtmDetails;
