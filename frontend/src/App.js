import "./App.css";
import NavBar from "./components/NavBar";
import BankInfo from "./components/BankInfo";
import Map from "./components/Map";
import FilterAtm from "./components/FilterAtm";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="App-body">
         <BankInfo/>
         <Map/>
         <FilterAtm/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
