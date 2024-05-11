import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
//import Home from './Pages/Home/Home.jsx';
//import Cart from './Pages/Cart/Cart.jsx';
//import PlaceOrder from './Pages/Place Order/PlaceOrder.jsx'
import './index.css';
import StoreContextProvider from './Context/StoreContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
    
  
)
