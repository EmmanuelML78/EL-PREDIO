const mercadopago = require("mercadopago");
require("dotenv").config();

// Agrega credenciales
mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

module.exports = {
  mercadopago,
};
