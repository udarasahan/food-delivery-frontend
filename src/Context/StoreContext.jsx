 import {createContext, useEffect} from "react";
import { food_list } from "../assets/assets";
import { useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});

    const addToCart = (itemID) => {
        if (!cartItems[itemID]) {
            setCartItems((prev)=>({...prev,[itemID]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemID]:prev[itemID]+1}))
        }
    }

    const removeFromCart = (itemID) => {
        setCartItems((prev)=>({...prev,[itemID]:prev[itemID]-1}))
    }

    useEffect(()=> {
        console.log(cartItems)
    },[cartItems])



const contextValue ={
     food_list,
     cartItems,
     setCartItems,
     addToCart,
     removeFromCart,
}
return (
    <StoreContext.Provider value={contextValue}>
        {props}
    </StoreContext.Provider>
)

}

export default StoreContextProvider;