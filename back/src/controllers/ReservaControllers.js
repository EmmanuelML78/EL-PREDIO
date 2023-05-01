const { Reserva, User, Cancha } = require("../db");
const { mercadopago } = require("../utils/mercadoPago");

const getAllReservations = async (reservaid) => {
  try {
    if (reservaid) {
      return await Reserva.findById(reservaid);
    } else {
      return await Reserva.findAll({
        paranoid: false,
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

  if (!reservaId) {
    return res.status(400).json({ error: "Falta el ID de la reserva" });
  }

  const reserva = await Reserva.findOne({
    where: { id: reservaId },
    include: [
      {
        model: Cancha,
        as: "cancha",
      },
    ],
  });

  if (!reserva) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }

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
      success: "https://el-predio-production-32b7.up.railway.app/success", // redirect to this url if payment is successful
      failure: "https://el-predio-production-32b7.up.railway.app/failure", // redirect to this url if payment fails
      pending: "https://el-predio-production-32b7.up.railway.app/pending", // redirect to this url if payment is pending
    },
    auto_return: "approved",
    binary_mode: true,
    notification_url: "https://pruebamercado.hopto.org/notificaciones", // URL de la ruta para recibir la notificación de MercadoPago
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la preferencia de pago" });
  }
};

// const updatePayReserva = async (reservaId, status) => {
//   try {
//     const reserva = await Reserva.update(
//       { status },
//       { where: { id: reservaId }, returning: true }
//     );
//     console.log(`Estado de reserva ${reservaId} actualizado a ${status}`);
//     return reserva[1][0]; // Devuelve la reserva actualizada
//   } catch (error) {
//     console.error(
//       `Error actualizando estado de reserva ${reservaId}: ${error.message}`
//     );
//     throw error;
//   }
// };

module.exports = {
  getAllReservations,
  deleteReserva,
  updateReserva,
  getUsersDb,
  payReserver,
  // updatePayReserva,
};
