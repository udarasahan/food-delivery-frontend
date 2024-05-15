import { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import PropTypes from 'prop-types';

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign In");

  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currentState !== "Login" && <input type="text" placeholder='Your Name' required />}
          <input type="email" placeholder='Your Email' required />
          <input type="password" placeholder='Password' required />
        </div>
        <button type="submit">{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login"
          ? <p>Creating a new account? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
};

LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopup;
