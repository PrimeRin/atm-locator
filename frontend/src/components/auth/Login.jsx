import React, { useState } from 'react'
import rmalogo from "../../assets/img/rma-logo.png"
import '../css/Login.css'
const Login = () => {
  const [userId,setUserId]=useState(null);
  const [password,setPassword]=useState(null);

  const handleLoginSubmit=(e)=>{
    e.preventDefault();
    console.log(userId,password);
  }
  return (
    <div className='Logincontainer'>
      <div>
        <img src={rmalogo} alt="rmalogo" className="logo"/>
        <h4>ATM LOCATOR</h4>
      </div>
      <form onSubmit={handleLoginSubmit} className='loginform'>
      <input type="text" placeholder="User ID" required onChange={(e)=>setUserId(e.target.value)} className='logininputs'/>
      <input type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} className='logininputs'/>
      <button type="submit" className='loginbutton' >Login</button>
      </form>
    </div>
  )
}

export default Login