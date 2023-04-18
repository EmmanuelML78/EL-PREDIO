const { Reserva, User } = require("../db");

const getAllReservations = async (reservaid) => {
  try {
    if (reservaid) {
      return await Reserva.findById(reservaid);
    } else {
      return await Reserva.findAll({});
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

module.exports = {
  getAllReservations,
  deleteReserva,
  updateReserva,
  getUsersDb,
};
