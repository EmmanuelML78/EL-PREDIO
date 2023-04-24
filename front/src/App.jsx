import "./App.css";
import Landing from "./components//Landing/Landing.jsx";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Detail from "./components/Detail/Detail";
import DashBoard from "./components/DashBoard/DashBoard";
import CreadorCanchas from "./components/CreadorCanchas/CreadorCanchas";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import CanchasTable from "./components/CanchasTable/CanchasTable";
import About from "./components/About/About";
import Contactos from "./components/Contactos/Contactos";
import Navbar from "./components/Navbar/Navbar";
import MisReservas from "./components/MisReservas/MisReservas";
// import axios from "axios";
// axios.defaults.baseURL = "https://el-predio-production-32b7.up.railway.app";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route
          path="/canchas/:id"
          render={({ match }) => <Detail match={match} />}
        />
        <Route exact path="/dashboard">
          <DashBoard />
        </Route>
        <Route path="/creador">
          <CreadorCanchas />
        </Route>
        <Route path="/tabla">
          <CanchasTable />
        </Route>
        <Route path="/misreservas">
          <MisReservas />
        </Route>
        <Route path="/nosotros">
          <About />
          <Footer />
        </Route>
        <Route path="/contactos">
          <Navbar />
          <Contactos />
          <Footer />
        </Route>
      </Switch>
    </>
  );
}

export default App;
