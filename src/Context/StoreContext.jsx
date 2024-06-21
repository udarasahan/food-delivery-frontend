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

    const addToCart = async (itemID) => {
        if (!itemID) {
            console.error("Invalid itemID:", itemID);
            return;
        }
        console.log("Adding to cart:", itemID);
        setCartItems((prev) => {
            const newCount = (prev[itemID] || 0) + 1;
            return { ...prev, [itemID]: newCount };
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemID }, { headers: { token } });
            } catch (error) {
                console.error("Error adding item to cart:", error);
                // Optionally revert the state update if API call fails
                setCartItems((prev) => {
                    const newCount = (prev[itemID] || 1) - 1;
                    return { ...prev, [itemID]: newCount > 0 ? newCount : 0 };
                });
            }
        }
    };

    const removeFromCart = async (itemID) => {
        if (!itemID) {
            console.error("Invalid itemID:", itemID);
            return;
        }
        console.log("Removing from cart:", itemID);
        let shouldCallAPI = true;

        setCartItems((prev) => {
            const newCount = (prev[itemID] || 1) - 1;
            if (newCount <= 0) {
                shouldCallAPI = false;
            }
            const updatedCart = { ...prev, [itemID]: newCount > 0 ? newCount : 0 };
            return updatedCart;
        });

        if (token && shouldCallAPI) {
            try {
                await axios.post(url + "/api/cart/remove", { itemID }, { headers: { token } });
            } catch (error) {
                console.error("Error removing item from cart:", error);
                // Optionally revert the state update if API call fails
                setCartItems((prev) => {
                    const newCount = (prev[itemID] || 0) + 1;
                    return { ...prev, [itemID]: newCount };
                });
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        console.log("Calculating total cart amount. Cart items:", cartItems);
        for (const item in cartItems) {
            console.log("Processing item:", item);
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Item with ID ${item || 'undefined'} not found in food_list.`);
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

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            const validCartData = Object.fromEntries(Object.entries(response.data.cartData).filter(([key]) => key));
            console.log("Loaded cart data from server:", validCartData);
            setCartItems(validCartData);
        } catch (error) {
            console.error("Failed to load cart data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
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
