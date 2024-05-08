import React from 'react'
import 
 {BsFillCircleFill, BsJustify}
 from 'react-icons/bs'
 import profile from "../../assets/img/profile.jpeg";

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-right'>
           <div className='profile-img-con'>
             <img src={profile} alt="Logo" className="profile-img" />
             <BsFillCircleFill className='active-dot' size={12}/>
           </div>
           <div className='profile-details'>
              <span className='profile-name'>Bank Manager</span>
              <span className='bank-name'>BOB</span>
           </div>
        </div>
    </header>
  )
}

export default Header