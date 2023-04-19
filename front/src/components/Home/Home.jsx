import Cards from "../Cards/Cards";
import Carousel from "../Carousel/Carousel";
import Footer from "../Footer/Footer";

import Header from "../Header/Header";
import { Promociones } from "../Promociones/Promociones";
import { Nosotros } from "../Nosotros/Nosotros";
import "./Home.module.css"

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Carousel />
      <Cards />
      <Promociones />
      <Nosotros />
      <Footer />
    
    </div>
  );
};

export default Home;
