const { Reserva, User, Cancha } = require("../db");
const { mercadopago } = require("../utils/mercadoPago");

const changeStatusSuccess = async (id) => {
  const idReserva = id;
  try {
    const reservaPendiente = await Reserva.findByPk(idReserva);
    const id = reservaPendiente.id;
    const date = reservaPendiente.date;
    const start = reservaPendiente.start;
    const end = reservaPendiente.end;
    const status = "success";
    const hasPromo = reservaPendiente.hasPromo;
    const updatedReserva = await updateReserva(
      id,
      date,
      start,
      end,
      status,
      hasPromo
    );
    console.log("afterput:", updatedReserva);
    return updatedReserva;
  } catch (error) {
    console.log(error);
  }
};

const changeStatusPending = async (id) => {
  const idReserva = id;
  try {
    const reservaPendiente = await Reserva.findByPk(idReserva);
    const id = reservaPendiente.id;
    const date = reservaPendiente.date;
    const start = reservaPendiente.start;
    const end = reservaPendiente.end;
    const status = "pending";
    const hasPromo = reservaPendiente.hasPromo;
    const updatedReserva = await updateReserva(
      id,
      date,
      start,
      end,
      status,
      hasPromo
    );
    console.log("afterput:", updatedReserva);
    return updatedReserva;
  } catch (error) {
    console.log(error);
  }
};

const changeStatusFailure = async (id) => {
  const idReserva = id;
  try {
    const reservaPendiente = await Reserva.findByPk(idReserva);
    const id = reservaPendiente.id;
    const date = reservaPendiente.date;
    const start = reservaPendiente.start;
    const end = reservaPendiente.end;
    const status = "failure";
    const hasPromo = reservaPendiente.hasPromo;
    const updatedReserva = await updateReserva(
      id,
      date,
      start,
      end,
      status,
      hasPromo
    );
    console.log("afterput:", updatedReserva);
    return updatedReserva;
  } catch (error) {
    console.log(error);
  }
};

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
  const estado = status;
  console.log(estado);
  console.log(reserva);
  if (!reserva) return { error: "Reserva no existe" };
  else {
    date && (reserva.date = date);
    start && (reserva.start = start);
    end && (reserva.end = end);
    status && (reserva.status = estado);
    hasPromo && (reserva.hasPromo = hasPromo);

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
    external_reference: reservaId.toString(),
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
      success: `http://localhost:3001/reserva/success/${reservaId}`, // redirect to this url if payment is successful
      failure: `http://localhost:5173/reserva/failure/${reservaId}`, // redirect to this url if payment fails
      pending: `http://localhost:5173/reserva/pending/${reservaId}`, // redirect to this url if payment is pending
    },
    auto_return: "approved",
    binary_mode: true,
    notification_url:
      "https://039c-181-20-152-27.ngrok-free.app/reserva/notificaciones",
    // URL de la ruta para recibir la notificación de MercadoPago
    payment_methods: {
      excluded_payment_types: [
        {
          id: "ticket",
        },
      ],
    },
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    const pagoId = response.body.id;
    await Reserva.update({ id_pago: pagoId }, { where: { id: reservaId } });
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
