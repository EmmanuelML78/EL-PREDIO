const { Cancha } = require("../db");

const getAllcanchas = async (canchaId) => {
  try {
    if (canchaId) {
      return await Cancha.findByPk(canchaId);
    } else {
      return await Cancha.findAll({});
    }
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: "Error al buscar las canchas" });
  }
};

const getCanchaEliminadas = async (req, res) => {
  try {
    const canchas = await Cancha.findAll({
      paranoid: false,
      where: { deleted_at: { [Op.ne]: null } },
    });
    res.status(200).json(canchas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCanchas = async (
  id,
  name,
  image,
  price,
  open,
  close,
  hasPromo,
  description,
  availability,
  grass,
  players
) => {
  const cancha = await Cancha.findByPk(id);

  if (!cancha) return { error: "Cancha no existe" };
  else {
    if (name) cancha.name = name;
    if (image) cancha.image = image;
    if (price) cancha.price = price;
    if (open) cancha.open = open;
    if (close) cancha.close = close;
    if (hasPromo) cancha.hasPromo = hasPromo;
    if (description) cancha.description = description;
    if (availability) cancha.availability = availability;
    if (grass) cancha.grass = grass;
    if (players) cancha.players = players;

    await cancha.save();
    return cancha;
  }
};

const deleteCancha = async (id) => {
  try {
    const eraseCancha = await Cancha.destroy({ where: { id: id } });
    return eraseCancha;
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: "Error al eliminar la cancha" });
  }
};

module.exports = {
  getAllcanchas,
  getCanchaEliminadas,
  deleteCancha,
  updateCanchas,
};
