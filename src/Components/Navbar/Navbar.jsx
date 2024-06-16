import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className='Navbar'>
      <Link to='/'><p className='logo'>PepperPlace.</p></Link>
      <ul className="navbar-menu">
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile app")} className={menu === "mobile app" ? "active" : ""}>Mobile App</a>
        <a href='#footer' onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt='search_icon' className='search_icon' />
        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.bucket} alt='bucket' className='bucket' /></Link>
          <div className='dot'></div>
        </div>
        {!token?<button onClick={() => setShowLogin(true)}>Sign In</button>
        :<div className='navbar-profile'>
            <img src={assets.profileImage} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bagIcon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logoutIcon} alt="" /><p>Logout</p></li>
            </ul>
        </div>
        }
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
