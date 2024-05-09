import {BrowserRouter,Routes,Route} from "react-router-dom"
import LandingPage from "./pages/Landing";
import Dashboard from "./components/js/Dashboard";
import Login from "../src/components/auth/Login"
import NewAtm from "./components/js/NewAtm";
import AtmDetail from "./components/js/AtmDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAtmList from "./pages/AdminAtmList";
import AdminNewAtm from "./pages/AdminNewAtm";
import AdminAtmDetails from "./pages/AdminAtmDetail";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/login" element={<Login/>}></Route> 
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/create-atm" element={<NewAtm/>}></Route>
      <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
      <Route path="/admin-register-atm" element={<AdminNewAtm/>}></Route>
      <Route path="/admin-atm-list" element={<AdminAtmList/>}></Route>
      <Route path="/admin-atm-list/:id" element={<AdminAtmDetails/>}></Route>
      <Route path="/test" element={<AdminAtmDetails/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
