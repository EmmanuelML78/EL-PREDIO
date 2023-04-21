import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";

import Header from "../Header/Header";
import { Promociones } from "../Promociones/Promociones";
import { Nosotros } from "../Nosotros/Nosotros";
import "./Home.module.css"

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Cards />
      <Promociones />
      <Nosotros />
      <Footer />
    
    </div>
  );
};

export default Home;
