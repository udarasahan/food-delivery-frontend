import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import PropTypes from 'prop-types';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div>
      <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a tantalizing array of culinary delights, each dish crafted with care to satisfy your every craving.</p>
        <div className='explore-menu-list'>
          {menu_list.map((item, index) => (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-items'>
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="item" />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
};

ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;
