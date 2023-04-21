const { Reserva, User } = require("../db");
const mercadopago = require("../utils/mercadoPago");

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
  const reservaId = req.params.id;
  const datos = req.body.items;
  const reserva = await Reserva.findById(reservaId);
  let preference = {
    transaction_amount: parseInt(reserva.cancha.price),
    binary_mode: true,
    payer: {
      name: datos.name,
      surname: datos.surname,
      email: datos.email,
      identification: datos.identification,
      phone: {
        number: parseInt(datos.phone),
        area_code: "54",
      },
      address: {
        municipio: datos.municipio,
        address: datos.address,
      },
    },
    back_urls: {
      success: "http://localhost:3000/",
      failure: "http://localhost:3000/",
      pending: "http://localhost:3000/",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      console.log(response);
      res.josn({
        global: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.status(400).json({
        error: error.message,
      });
    });
};

module.exports = {
  getAllReservations,
  deleteReserva,
  updateReserva,
  getUsersDb,
  payReserver,
};
