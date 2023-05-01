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
import Failure from "./components/Results/failure/failure";
import Pending from "./components/Results/pending/Pending";
import Succes from "./components/Results/Succes/Succes";
import CreadorReviews from "./components/CreadorReviews/CreadorReviews";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/login">
          <Landing />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
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
          <Navbar />
          <About />
          <Footer />
        </Route>
        <Route path="/contactos">
          <Navbar />
          <Contactos />
          <Footer />
        </Route>
        <Route path="/failure">
          <Failure />
        </Route>
        <Route path="/pending">
          <Pending />
        </Route>
        <Route path="/success">
          <Succes />
        </Route>
        <Route path="/reviews">
          <CreadorReviews />
        </Route>
      </Switch>
    </>
  );
}

export default App;
