import AdminLayout from '../components/layout/AdminLayout'
import Home from '../components/js/Home';

function AdminDashboard() {
  console.log('admin dashboard');

  return (
    <AdminLayout>
      <Home/>
    </AdminLayout>
  )
}

export default AdminDashboard
