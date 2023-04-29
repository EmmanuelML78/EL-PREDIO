const { Reserva, User, Cancha } = require("../db");
const { mercadopago } = require("../utils/mercadoPago");

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
  // console.log("body: ", reservaId)
  const reserva = await Reserva.findByPk(reservaId, {
    include: [
      {
        model: Cancha,
        as: "cancha",
      },
    ],
  });

  let preference = {
    items: [
      {
        id: reservaId,
        title: reserva.cancha.name,
        quantity: 1,
        currency_id: "ARS",
        unit_price: reserva.cancha.price,
      },
    ],
    back_urls: {
      success: "http://localhost:5173/success", // redirect to this url if payment is successful
      failure: "http://localhost:5173/failure", // redirect to this url if payment fails
      pending: "http://localhost:5173/pending", // redirect to this url if payment is pending
    },
    auto_return: "approved",
    binary_mode: true,
    notification_url:
      "https://440e-179-51-123-195.ngrok-free.app/notificaciones", // URL de la ruta para recibir la notificación de MercadoPago
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la preferencia de pago" });
  }
};

// const updatePayReserva = async (req, res) => {
//   const reservaId = req.query.external_reference; // el ID de la reserva se envía en el parámetro external_reference
//   const status = req.query.status; // el estado de la transacción se envía en el parámetro status

//   const reserva = await Reserva.findByPk(reservaId);
//   if (!reserva) {
//     return res.status(404).json({ error: "Reserva no encontrada" });
//   }

//   reserva.estado = status;
//   await reserva.save();

//   res.send("OK"); // MercadoPago espera una respuesta 200 OK para confirmar la recepción de la notificación
// };
const updatePayReserva = async (reservaId, status) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(
      reservaId,
      { status },
      { new: true }
    );
    console.log(`Estado de reserva ${reservaId} actualizado a ${status}`);
    return reserva;
  } catch (error) {
    console.error(
      `Error actualizando estado de reserva ${reservaId}: ${error.message}`
    );
    throw error;
  }
};

module.exports = {
  getAllReservations,
  deleteReserva,
  updateReserva,
  getUsersDb,
  payReserver,
  updatePayReserva,
};
