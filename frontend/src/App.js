import {BrowserRouter,Routes,Route} from "react-router-dom"
import LandingPage from "./pages/Landing";
import Dashboard from "./components/js/Dashboard";
import Login from "../src/components/auth/Login"
import NewAtm from "./components/js/NewAtm";
import AtmDetail from "./components/js/AtmDetail";
import AdminDashboard from "./components/js/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/login" element={<Login/>}></Route> 
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
      <Route path="/create-atm" element={<NewAtm/>}></Route>
      <Route path="/atm/:id" component={<AtmDetail/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
