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
    name
      ? (cancha.name = name)
      : image
      ? (cancha.image = image)
      : price
      ? (cancha.price = price)
      : open
      ? (cancha.open = open)
      : close
      ? (cancha.close = close)
      : hasPromo
      ? (cancha.hasPromo = hasPromo)
      : description
      ? (cancha.description = description)
      : availability
      ? (cancha.availability = availability)
      : grass
      ? (cancha.grass = grass)
      : players
      ? (cancha.players = players)
      : null;

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
