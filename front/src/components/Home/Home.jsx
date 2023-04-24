import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "../Header/Header";
import { Promociones } from "../Promociones/Promociones";
import { Nosotros } from "../Nosotros/Nosotros";
import "./Home.module.css";
import { setUser } from "../../redux/actions/authActions";
import Error401 from "../Error401/Error401";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(setUser());
    }
  }, [dispatch, user]);

  return (
    <div className="home-container">
      {user ? (
        <>
          <Header />
          <Cards />
          <Promociones />
          <Nosotros />
          <Footer />
        </>
      ) : (
        <Error401 />
      )}
    </div>
  );
};

export default Home;
