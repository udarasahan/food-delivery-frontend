import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);

    const addToCart = (itemID) => {
        setCartItems((prev) => {
            const newCount = (prev[itemID] || 0) + 1;
            return { ...prev, [itemID]: newCount };
        });
    };

    const removeFromCart = (itemID) => {
        setCartItems((prev) => {
            const newCount = (prev[itemID] || 1) - 1;
            const updatedCart = { ...prev, [itemID]: newCount > 0 ? newCount : 0 };
            return updatedCart;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Item with ID ${item} not found in food_list.`);
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch food list:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        console.log("Cart Items updated:", cartItems);
    }, [cartItems]);

    useEffect(() => {
        console.log("Food List updated:", food_list);
    }, [food_list]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        loading
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StoreContextProvider;
