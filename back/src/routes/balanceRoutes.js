const { Router } = require("express");
const router = Router();
const { getAllbalance } = require("../controllers/BalanceControllers");
const { Balance } = require("../db");
const { adminMiddleware } = require("../middlewares/auth");

router
  .get("/", adminMiddleware, async (req, res) => {
    try {
      let balance = await getAllbalance();
      res.status(200).send(balance);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  })
  .post("/", adminMiddleware, async (req, res) => {
    const { cierreCaja, descripcion } = req.body;
    try {
      if (!cierreCaja && !descripcion) {
        return res.status(400).json({
          error: "Debe ingresar los campos (cierreCaja y descripcion)",
        });
      }
      const newBalance = await Balance.create({
        cierreCaja,
        descripcion,
      });
      return res.status(200).json(newBalance);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Error al crear el cierre de caja" });
    }
  });

module.exports = router;
