import "./App.css";
import NavBar from "./components/NavBar";
import BankInfo from "./components/BankInfo";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="App-body">
         <BankInfo/>
      </div>
    </div>
  );
}

export default App;
