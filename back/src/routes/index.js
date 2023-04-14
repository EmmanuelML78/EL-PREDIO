const { Router } = require("express");
const userRoute = require("./userRoute");
const canchaRoute = require("./canchaRoutes");
const reservaRoute = require("./reservaRoute");

const router = Router();

router.use("/", userRoute);
router.use("/canchas", canchaRoute);
router.use("/reserva", reservaRoute);

module.exports = router;
