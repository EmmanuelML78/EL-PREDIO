const { Reserva, User, Cancha } = require("../db");
const { mercadopago } = require("../utils/mercadoPago");
// console.log(mercadopago);

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
  // console.log(req.body)
  const reservaId = req.body.id;
  // const reservaId = 2;
  const datos = req.body;
  const reserva = await Reserva.findOne({
    where: { id: reservaId },
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
        title: "Reserva de cancha",
        description: "Reserva de cancha deportiva",
        quantity: 1,
        currency_id: "ARS",
        unit_price: reserva.dataValues.cancha.price,
      },
    ],
    payer: {
      id: datos.userId
      // name: datos.name,
      // surname: datos.surname,
      // email: datos.email,
      // identification: {
      //   type: "DNI",
      //   number: datos.identification,
      // },
      // phone: {
      //   area_code: "",
      //   number: parseInt(datos.phone),
      // },
      // address: {
      //   zip_code: "",
      //   street_name: datos.address,
      //   street_number: 2,
      // },
    },
    back_urls: {
      success: "http://localhost:3000/pago-exitoso",
      pending: "http://localhost:3000/pago-pendiente",
      failure: "http://localhost:3000/pago-fallido",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ preferenceId: response.body.id }); // devolver el ID de preferencia al frontend
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
