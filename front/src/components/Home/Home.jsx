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

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await dispatch(setUser());
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, user]);
  console.log("user:", user);

  return (
    <div className="home-container">
      {isLoading ? (
        <Loading />
      ) : user && user.id ? (
        <>
          <Header />
          <Cards />
          <Promociones />
          <Nosotros />
          <Footer />
        </>
      ) : (
        user &&
        user.error && (
          <>
            <Error401 />
          </>
        )
      )}
    </div>
  );
};

export default Home;
