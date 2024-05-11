import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';
import  {useContext} from 'react';
import PropTypes from 'prop-types';

const FoodDisplay = () => {

const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food_display'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
            {food_list.map((item,index)=>{
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            })}
        </div>
    </div>
  )
}

FoodDisplay.PropTypes = {
    category: PropTypes.string.isRequired,
}

export default FoodDisplay;