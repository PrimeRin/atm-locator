import "./App.css";
import NavBar from "./components/NavBar";
import BankInfo from "./components/BankInfo";
import Map from "./components/Map";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="App-body">
         <BankInfo/>
         <Map/>
         
      </div>
    </div>
  );
}

export default App;
