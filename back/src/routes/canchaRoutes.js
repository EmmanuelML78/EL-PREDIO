const { Router } = require("express");
const router = Router();
const {
  getAllcanchas,
  deleteCancha,
  updateCanchas,
} = require("../controllers/CanchaControllers");
const { Cancha, Reserva } = require("../db");

router
  .get("/", async (req, res) => {
    try {
      let canchas = await getAllcanchas();
      res.status(200).send(canchas);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  })
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      if (id) {
        const cancha = await Cancha.findOne({
          where: { id: id },
          include: [
            {
              model: Reserva,
              as: "reservas",
              attributes: [
                "date",
                "start",
                "end",
                "status",
                "hasPromo",
                "userId",
              ],
            },
          ],
        });
        cancha
          ? res.status(200).send(cancha)
          : res.status(404).json({ message: "Cancha no encontrada" });
      } else {
        res.status(400).json({ message: "Falta el parámetro 'id'" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener la Cancha" });
    }
  })
  .post("/", async (req, res) => {
    const {
      name,
      image,
      price,
      open,
      close,
      hasPromo,
      description,
      availability,
      grass,
      players,
    } = req.body;
    try {
      if ((!name, !price, !open, !close, !availability)) {
        return res.status(400).json({
          error:
            "Debe ingresar los campos (name/price/open/close/availability)",
        });
      }
      const newCancha = await Cancha.create({
        name,
        image,
        price,
        open,
        close,
        hasPromo,
        description,
        availability,
        grass,
        players,
      });
      // res.status(200).send('Cancha creada con exito');
      return res.status(200).json(newCancha);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al crear la cancha" });
    }
  })
  .put("/", async (req, res) => {
    const {
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
      players,
    } = req.body;

    if (
      id &&
      (name ||
        image ||
        price ||
        open ||
        close ||
        hasPromo ||
        description ||
        availability ||
        grass ||
        players)
    ) {
      try {
        const canchaUpdate = await updateCanchas(
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
        );
        return res.status(200).json({ message: "actualizado correctamente" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al actualizar la cancha" });
      }
    } else {
      return res.status(400).json({ message: error });
    }
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const eraseReserva = await deleteCancha(id);
      eraseReserva
        ? res.status(200).json({ message: "Reserva eliminada con éxito" })
        : res.status(404).json({ message: "Reserva no encontrada" });
    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar la Reserva" });
    }
  });

module.exports = router;
