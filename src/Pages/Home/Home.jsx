import { useState } from 'react';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar'
import './Home.css';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';

const Home = () => {

    const [category, setCategory] = useState("All");

  return (
    <div>
        <Navbar />
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
    </div>
  )
}

export default Home;