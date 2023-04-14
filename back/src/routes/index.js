const { Router } = require("express");
const router = Router();
const morgan = require("morgan");
const express = require("express");
const canchaRoutes = require('./canchaRoutes')
const userRoute = require("./userRoute");

router.use(express.json());
router.use(morgan("dev"));

router.use("/", userRoute);
router.use('/canchas', canchaRoutes)

module.exports = router;
