import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [data, setData] = useState(null);
  useEffect(()=>{
    fetch('http://localhost:8082/users')
   .then(res => res.json())
   .then(data => setData(data))
   .catch(err => console.log(err))
  }, [] )
  
  return (
    <div className="App">
      HERE I AM
    </div>
  );
}

export default App;


map
{ATM_DATA.features
  .filter((atm) => checkboxStates[atm.properties.category])
  .map((atm, index) => (
    <Marker
      key={index}
      position={{
        lat: atm.geometry.coordinates[1],
        lng: atm.geometry.coordinates[0],
      }}
      icon={{
        url: categoryToImage[atm.properties.category],
        scaledSize: new window.google.maps.Size(50, 50),
      }}
      onClick={() => {
        openDialog(atm);
      }}
    />
  ))} 