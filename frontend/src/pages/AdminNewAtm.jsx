import AdminLayout from "../components/layout/AdminLayout";
import "../components/css/NewAtm.css";
import NewAtm from "../components/js/NewAtm";

function AdminNewAtm({user}) {
  return (
    <AdminLayout user={user}>
      <NewAtm/>
    </AdminLayout>
  );
}

export default AdminNewAtm
