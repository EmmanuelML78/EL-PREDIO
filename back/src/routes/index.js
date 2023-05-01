const { Router } = require("express");
const userRoute = require("./userRoute");
const canchaRoute = require("./canchaRoutes");
const reservaRoute = require("./reservaRoute");
const reviewsRoute = require("./reviewRoute");
const authRoute = require("./authRoute");
const promoRoute = require("./promoRoute");

const router = Router();

router.use("/", authRoute);
router.use("/", userRoute);
router.use("/", promoRoute);
router.use("/canchas", canchaRoute);
router.use("/reserva", reservaRoute);
router.use("/reviews", reviewsRoute);

module.exports = router;
