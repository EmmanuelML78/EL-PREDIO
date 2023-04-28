const { Reserva, User, Cancha } = require("../db");
const { mercadopago } = require("../utils/mercadoPago");
const nodemailer = require("nodemailer");

const getAllReservations = async (reservaid) => {
  try {
    if (reservaid) {
      return await Reserva.findById(reservaid);
    } else {
      return await Reserva.findAll({
        include: [
          {
            model: User,
            as: "user",
          },
          {
            model: Cancha,
            as: "cancha",
          },
        ],
      });
    }
  } catch (error) {
    return [];
  }
};

const getUsersDb = async () => {
  try {
    const users = await User.findAll({ paranoid: false });
    return users;
  } catch (error) {
    console.log(error);
  }
};

const deleteReserva = async (id) => {
  try {
    const deletedReserva = await Reserva.destroy({ where: { id: id } });
    return deletedReserva;
  } catch (error) {
    throw error;
  }
};

const updateReserva = async (id, date, start, end, status, hasPromo) => {
  const reserva = await Reserva.findByPk(id);

  if (!reserva) return { error: "Reserva no existe" };
  else {
    date
      ? (reserva.date = new Date(date))
      : start
      ? (reserva.start = start)
      : end
      ? (reserva.end = end)
      : status
      ? (reserva.status = status)
      : hasPromo
      ? (reserva.hasPromo = hasPromo)
      : null;

    await reserva.save();
    return reserva;
  }
};

const payReserver = async (req, res) => {
  const reservaId = req.body.id;
  const datos = req.body;
  let preference = {
    items: [
      {
        id: reservaId,
        title: datos.title,
        quantity: 1,
        currency_id: "ARS",
        unit_price: datos.price,
      },
    ],
    back_urls: {
      success: "http://localhost:5173/success", // redirect to this url if payment is successful
      failure: "http://localhost:5173/failure", // redirect to this url if payment fails
      pending: "http://localhost:5173/pending", // redirect to this url if payment is pending
    },
    auto_return: "approved",
    binary_mode: true,
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la preferencia de pago" });
  }
};

module.exports = {
  getAllReservations,
  deleteReserva,
  updateReserva,
  getUsersDb,
  payReserver,
};
