import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import s from "./toast.css";
import s from "./toast.css?inline";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router basename="/">
      <ToastContainer style={{position:"absolute", top:"-99999px", left:"-99999px"}} className={s.toast} />
      <App />
    </Router>
  </Provider>
);
