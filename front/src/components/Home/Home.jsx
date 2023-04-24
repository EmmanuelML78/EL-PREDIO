import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Promociones } from "../Promociones/Promociones";
import { Nosotros } from "../Nosotros/Nosotros";
import "./Home.module.css";
import { setUser } from "../../redux/actions/authActions";
import Error401 from "../Error401/Error401";
import Loading from "../Loading/Loading";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      user
      if (!user) {
        await dispatch(setUser());
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, user]);

  return (
    <div className="home-container">
      {isLoading ? (
        <Loading />
      ) : user ? (
        <>
          <Header />
          <Cards />
          <Promociones />
          <Nosotros />
          <Footer />
        </>
      ) : (
        <>
          <Error401 />
        </>
      )}
    </div>
  );
};

export default Home;
