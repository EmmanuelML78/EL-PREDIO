const { Promotion } = require("../db");

const getPromos = async (req, res) => {
  try {
    let promos = await Promotion.findAll();
    return res.status(200).json(promos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener promociones" });
  }
};

const getPromosInactive = async (req, res) => {
  try {
    let promos = await Promotion.findAll({
      where: {
        deletedAt: { [Op.not]: null },
      },
      paranoid: false,
    });
    return res.status(200).json(promos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener promociones" });
  }
};

const getPromoById = async (id) => {
  try {
    const promo = await Promotion.findOne({
      where: { id },
      // include: {
      //   model: Type,
      //   attributes: ["name"],
      //   through: {
      //     attributes: [],
      //   },
      include: [
        { model: Cancha, through: { attributes: [] }, paranoid: false },
      ],
      paranoid: false,
    });
    return promo;
  } catch (error) {
    console.error(error);
  }
};

const updatePromo = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    image,
    description,
    type,
    startTime,
    endTime,
    date,
    advanceDays,
    discount,
    deletedAt,
  } = req.body;
  try {
    const promo = await Promotion.findByPk(id, { paranoid: false });
    if (!promo) {
      return res.status(404).json({ message: "Promoción no encontrada" });
    }
    if (deletedAt === null) {
      // Restaurar usuario eliminado
      await promo.restore();
    }

    promo.name = name || promo.name;
    promo.image = image || promo.image;
    promo.description = description || promo.description;
    promo.type = type || promo.type;
    promo.startTime = startTime !== undefined ? startTime : promo.startTime;
    promo.endTime = endTime !== undefined ? endTime : promo.endTime;
    promo.date = date !== undefined ? date : promo.date;
    promo.advanceDays =
      advanceDays !== undefined ? advanceDays : promo.advanceDays;
    promo.discount = discount || promo.discount;
    await promo.save();

    res.status(200).json({ message: "Promoción actualizada con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar promoción" });
  }
};

const deletePromo = async (id) => {
  try {
    const deletedPromo = await Promotion.destroy({ where: { id: id } });
    return deletedPromo;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPromos,
  getPromosInactive,
  getPromoById,
  updatePromo,
  deletePromo,
};
