import {BrowserRouter,Routes,Route} from "react-router-dom"
import LandingPage from "./pages/Landing";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAtmList from "./pages/AdminAtmList";
import AdminAtmDetails from "./pages/AdminAtmDetail";
import AdminAtmEdit from "./pages/AdminAtmEdit";
import AdminAtmRegister from "./pages/AdminAtmRegister";
import PageNotFound from "./components/js/PageNotFound";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("jwtToken"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {isAuthenticated && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-register-atm" element={<AdminAtmRegister />} />
            <Route path="/admin-atm-list" element={<AdminAtmList />} />
            <Route path="/admin-atm-list/:id" element={<AdminAtmDetails />} />
            <Route path="/admin-atm-list/:id/edit" element={<AdminAtmEdit />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
