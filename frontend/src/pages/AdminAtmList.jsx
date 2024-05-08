import AdminLayout from "../components/layout/AdminLayout";
import AtmLists from "../components/js/AtmLists";
import SearchBar from "../components/js/SearchBar";
import Filter from "../components/js/Filter";
import "../components/css/AtmList.css";

function AdminAtmList() {
  return (
    <AdminLayout>
      <div className="admin-atm-list-con">
        <SearchBar />
        <div className="admin-atm-inner-con">
          <Filter />
          <AtmLists/>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAtmList;
