const { Router } = require("express");
const router = Router();
const {
  getAllreviews,
  deleteReview,
  getReviewsEliminadas,
} = require("../controllers/ReviewsControllers");
const { Review, User } = require("../db");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth");

router
  .get("/", async (req, res) => {
    try {
      let reviews = await getAllreviews();
      res.status(200).send(reviews);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  })
  .get("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    try {
      if (id) {
        const review = await Review.findOne({
          where: { id: id },
          include: [
            {
              model: User,
              as: "user",
            },
          ],
        });
        review
          ? res.status(200).send(review)
          : res.status(404).json({ message: "Review no encontrada" });
      } else {
        res.status(400).json({ message: "Falta el parámetro 'id'" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener la Review" });
    }
  })

  .get("/reviews/eliminadas", adminMiddleware, getReviewsEliminadas)

  // .post("/", authMiddleware, async (req, res) => {
  //   const { score, text } = req.body;
  //   try {
  //     if ((!score, !text)) {
  //       return res.status(400).json({
  //         error: "Debe ingresar los campos (score/text)",
  //       });
  //     }
  //     const newReview = await Review.create({
  //       score,
  //       text,
  //     });
  //     // return res.status(200).send('Review creada con exito');
  //     return res.status(200).json(newReview);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ error: "Error al crear la review" });
  //   }
  // })
  .post("/", authMiddleware, async (req, res) => {
    const { score, text, userId } = req.body;
    // const user = req.user; // Obtener el modelo completo del usuario autenticado
    try {
      if ((!score, !text)) {
        return res.status(400).json({
          error: "Debe ingresar los campos (score/text)",
        });
      }
      const newReview = await Review.create({
        score,
        text,
        userId, // Agregar el modelo completo del usuario a la revisión
      });
      return res.status(200).json(newReview);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al crear la review" });
    }
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const eraseReview = await deleteReview(id);
      eraseReview
        ? res.status(200).json({ message: "Reserva eliminada con éxito" })
        : res.status(404).json({ message: "Reserva no encontrada" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error al eliminar la Reserva" });
    }
  });

module.exports = router;
