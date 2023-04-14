import Cards from "../Cards/Cards";
import Carousel from "../Carousel/Carousel";
import Footer from "../Footer/Footer";

import Header from "../Header/Header";
import "./Home.module.css"

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Carousel />
      <Cards />
    
    </div>
  );
};

export default Home;
