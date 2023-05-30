import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { setUser, logoutUser } from "../../redux/actions/authActions";
import { connect, useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSignInAlt } from "react-icons/fa";
import Navbar from "./../Navbar/Navbar";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(setUser());
    }
  }, [dispatch, user]);

  const handleLogout = async () => {
    // localStorage.removeItem("token");
    await dispatch(logoutUser());
    // window.location.href = "/";
    toast.success("¡Has cerrado sesión correctamente!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Carousel />
    </>
  );
}

export default connect(null, { logoutUser })(Header);
