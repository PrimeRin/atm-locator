import {BrowserRouter,Routes,Route} from "react-router-dom"
import LandingPage from "./pages/Landing";
import Dashboard from "./components/js/Dashboard";
import Login from "../src/components/auth/Login"
import NewAtm from "./components/js/NewAtm";
import AtmDetail from "./components/js/AtmDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAtmList from "./pages/AdminAtmList";
import AdminNewAtm from "./pages/AdminNewAtm";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/login" element={<Login/>}></Route> 
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/create-atm" element={<NewAtm/>}></Route>
      <Route path="/atm/:id" component={<AtmDetail/>} />
      <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
      <Route path="/admin-atm-list" element={<AdminAtmList/>}></Route>
      <Route path="/admin-register-atm" element={<AdminNewAtm/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
