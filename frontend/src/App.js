import {BrowserRouter,Routes,Route} from "react-router-dom"
import LandingPage from "./pages/Landing";
// import Login from "../src/components/auth/Login"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      {/* <Route path="/userlogin" element={<Login/>}></Route> */}
    </Routes>
    </BrowserRouter>
 
  );
}

export default App;
