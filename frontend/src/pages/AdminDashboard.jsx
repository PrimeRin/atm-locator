import AdminLayout from '../components/layout/AdminLayout'
import Home from '../components/js/Home';
import UserLocation from '../components/js/UserLocation';

function AdminDashboard({user}) {
  console.log('admin dashboard');

  return (
    <AdminLayout user={user}>
      <Home/>
    </AdminLayout>
  )
}

export default AdminDashboard
