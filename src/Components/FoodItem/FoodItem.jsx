import { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import PropTypes from 'prop-types';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    // Ensure the URL is constructed correctly
    const imageUrl = `${url}/images${image.startsWith('/') ? image : `/${image}`}`;

    // Debugging statement to check the id
    console.log("FoodItem rendered with ID:", id);

    // Validate id
    if (!id) {
        console.error("Invalid ID for FoodItem:", { id, name, price, description, image });
        return null;
    }

    return (
        <div className='food-item'>
            <div className='food-item-image-container'>
                <img className='food-item-image' src={imageUrl} alt={name} />
                {!cartItems[id]
                    ? <img className='add' onClick={() => { console.log("Adding to cart ID:", id); addToCart(id); }} src={assets.add_icon_white} alt="Add to cart" />
                    : <div className='food-item-counter'>
                        <img onClick={() => { console.log("Removing from cart ID:", id); removeFromCart(id); }} src={assets.remove_icon_red} alt="Remove from cart" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => { console.log("Adding more to cart ID:", id); addToCart(id); }} src={assets.add_icon_green} alt="Add more" />
                    </div>
                }
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.star_rating} alt="Rating" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">Rs.{price}</p>
            </div>
        </div>
    );
}

FoodItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default FoodItem;
