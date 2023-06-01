const { Balance } = require("../db");

const getAllbalances = async (balanceId) => {
  try {
    if (balanceId) {
      return await Cancha.findByPk(balanceId);
    } else {
      return await Cancha.findAll({});
    }
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: "Error al buscar los datos" });
  }
};

module.exports = { getAllbalances };
