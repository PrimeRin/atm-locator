import {BrowserRouter,Routes,Route} from "react-router-dom"
import LandingPage from "./pages/Landing";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAtmList from "./pages/AdminAtmList";
import AdminAtmDetails from "./pages/AdminAtmDetail";
import AdminAtmEdit from "./pages/AdminAtmEdit";
import AdminAtmRegister from "./pages/AdminAtmRegister";
import PageNotFound from "./components/js/PageNotFound";
import { useState, useEffect } from "react";
import { fetchUser } from "./components/service/user";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  async function handleFetchUser() {
    try {
      const result = await fetchUser();
      setIsAuthenticated(!!result)
      setUser(result);
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
    }
  }

  useEffect(() => {
    handleFetchUser();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {isAuthenticated && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard user={user}/>} />
            <Route path="/admin-register-atm" element={<AdminAtmRegister user={user} />} />
            <Route path="/admin-atm-list" element={<AdminAtmList user={user}/>} />
            <Route path="/admin-atm-list/:id" element={<AdminAtmDetails user={user}/>} />
            <Route path="/admin-atm-list/:id/edit" element={<AdminAtmEdit user={user}/>} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
