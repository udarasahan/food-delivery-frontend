import { useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';


const Navbar = () => {

const [menu,setMenu] = useState("home");

  return (
    <div className='Navbar'>
        <p className='logo'>PeperPlace.</p>
        <ul className="navbar-menu">
          <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</li>
          <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li>
          <li onClick={()=>setMenu("mobile app")} className={menu==="mobile app"?"active":""}>Mobile App</li>
          <li onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>Contact Us</li>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt='search_icon' className='search_icon' />
          <div className='navbar-search-icon'>
            <img src={assets.bucket} alt='bucket' className='bucket' />
            <div className='dot'></div>
          </div>
          <button>Sign In</button>
        </div>
    </div>
  )
}

export default Navbar