const router = require("express").Router();
const {
  getAllReservations,
  deleteReserva,
  updateReserva,
} = require("../controllers/ReservaControllers");
const { Reserva } = require("../db");

router
  .get("/", async (req, res) => {
    let allreserva = await getAllReservations();
    try {
      res.status(200).send(allreserva);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  })

  .get("/:id", async (req, res) => {
    const id = req.params.id;
    let allreserva = await getAllReservations();
    try {
      if (id) {
        const reservaid = await allreserva.filter((el) => el.id == id);
        id.length
          ? res.status(200).send(reservaid)
          : res
              .status(500)
              .json({ message: "Error al obtener Reserva por ID" });
      }
    } catch (error) {
      throw error;
    }
  })

  .post("/", async (req, res) => {
    const { date, start, end, status, hasPromo } = req.body;
    try {
      const reservation = await Reserva.create({
        date,
        start,
        end,
        status,
        hasPromo,
      });
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la reserva" });
    }
  })

  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const deletedReserva = await deleteReserva(id);
      deletedReserva
        ? res.status(200).json({ message: "Reserva eliminada con éxito" })
        : res.status(404).json({ message: "Reserva no encontrada" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la Reserva" });
    }
  })

  .put("/", async (req, res) => {
    const { id, date, start, end, status, hasPromo } = req.body;

    if (id && (date || start || end || status || hasPromo)) {
      try {
        const reservaUpdate = await updateReserva(
          id,
          date,
          start,
          end,
          status,
          hasPromo
        );
        return res.status(200).json(reservaUpdate);
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ error: "Error al actualizar la reserva" });
      }
    } else {
      return res.status(400).json({ message: error });
    }
  });

module.exports = router;
