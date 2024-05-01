import "./App.css";
import NavBar from "./components/js/NavBar";
import BankInfo from "./components/js/BankInfo";
import Map from "./components/js/Map";
import FilterAtm from "./components/js/FilterAtm";
import Footer from "./components/js/Footer";

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
