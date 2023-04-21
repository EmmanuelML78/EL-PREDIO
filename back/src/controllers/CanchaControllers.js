const { Cancha } = require("../db");

const getAllcanchas = async (canchaId) => {
  try {
    if (canchaId) {
      return await Cancha.findByPk(canchaId);
    } else {
      return await Cancha.findAll({});
    }
  } catch (error) {
    return [];
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
    throw error;
  }
};

module.exports = {
  getAllcanchas,
  deleteCancha,
  updateCanchas,
};
