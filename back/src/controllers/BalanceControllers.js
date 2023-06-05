const { Balance } = require("../db");

const getAllbalance = async (balanceId) => {
  try {
    if (balanceId) {
      return await Balance.findByPk(balanceId);
    } else {
      return await Balance.findAll({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al buscar los datos" });
  }
};

module.exports = { getAllbalance };
