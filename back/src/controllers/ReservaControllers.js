const { Reserva } = require('../db')

const getAllReservations = async (reservaid) => {
    try {
        if (reservaid) {
            return await Reserva.findById(reservaid)
        } else {
            return await Reserva.findAll({});

        }
      } catch (error) {
        return []
      }
    };

    const deleteReserva = async (id) => {
        try {
          const deletedReserva = await Reserva.destroy({ where: { id: id } });
          return deletedReserva;
        } catch (error) {
            throw error
        }
      };

  module.exports = {
    getAllReservations,
    deleteReserva
  }