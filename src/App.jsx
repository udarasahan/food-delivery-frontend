import './App.css';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';
import PlaceOrder from './Pages/Place Order/PlaceOrder';
import { useState } from 'react';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
