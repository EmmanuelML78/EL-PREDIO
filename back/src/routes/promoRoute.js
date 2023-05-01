const { Router } = require("express");
const {
  getPromos,
  getPromosInactive,
  getPromoById,
  updatePromo,
  deletePromo,
} = require("../controllers/promoController");

const router = Router();

router.get("/promotions", getPromos);
router.get("/promotions/inactive", getPromosInactive);

router.get("/promotions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const promo = await getPromoById(id);
    if (!promo) {
      return res.status(404).json({ message: "No se encontró la promoción" });
    }
    return res.status(200).json(promo);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener promoción mediante ID" });
  }
});

router.post("/promotions", async (req, res) => {
  let {
    name,
    image,
    description,
    type,
    startTime,
    endTime,
    date,
    advanceDays,
    discount,
  } = req.body;
  try {
    let createPromo = await Promotion.create({
      name,
      image,
      description,
      type,
      startTime,
      endTime,
      date,
      advanceDays,
      discount,
    });
    res.status(201).send(createPromo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear promoción" });
  }
});

router.put("/promotions/:id", updatePromo);

router.delete("/promotions/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPromo = await deletePromo(id);
    deletedPromo
      ? res.status(200).json({ message: "Promoción eliminada con éxito" })
      : res.status(404).json({ message: "Promoción no encontrada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar promoción" });
  }
});

module.exports = router;
