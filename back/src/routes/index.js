const { Router } = require("express");
const userRoute = require("./userRoute");

const router = Router();

router.use("/", userRoute);

module.exports = router;
