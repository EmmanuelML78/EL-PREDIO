import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-column">
        <h3>El Predio</h3>
        <p>+54938169343</p>
      </div>
      <div className="footer-column">
        <h3>Direccion</h3>
        <p>San juan 4105</p>
      </div>
      <div className="footer-column">
        <h3>Redes</h3>
        <a href="https://www.facebook.com/">Facebook</a>
        <p>
          <a href="https://twitter.com/">Twitter</a>
        </p>
        <p>
          <a href="https://www.instagram.com/">Instagram</a>
        </p>
      </div>
      <div className="footer-column">
        <h3>Telefono</h3>
        <p>+549381693437</p>
      </div>
    </div>
  );
};

export default Footer;
