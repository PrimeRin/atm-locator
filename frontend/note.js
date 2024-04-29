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
