import { useState } from 'react';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar'
import './Home.css';

const Home = () => {

    const [category, setCategory] = useState("All");

  return (
    <div>
        <Navbar />
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        
    </div>
  )
}

export default Home;