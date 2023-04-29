const { Review } = require("../db");

const getAllreviews = async (reviewId) => {
  try {
    if (reviewId) {
      return await Review.findByPk(reviewId);
    } else {
      return await Review.findAll();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar las reseñas" });
  }
};

const deleteReview = async (id) => {
  try {
    const eraseReview = await Review.destroy({ where: { id: id } });
    return eraseCancha;
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: "Error al eliminar la reseña" });
  }
};

const getReviewsEliminadas = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      paranoid: false,
      where: { deleted_at: { [Op.ne]: null } },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllreviews,
  deleteReview,
  getReviewsEliminadas,
};
