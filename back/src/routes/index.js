const { Router } = require("express");
const router = Router();
const morgan = require("morgan");
const express = require("express");
const reservaRoute = require("./reservaRoute")


router.use(express.json());
router.use(morgan("dev"));
router.use("/reserva", reservaRoute)


module.exports = router;