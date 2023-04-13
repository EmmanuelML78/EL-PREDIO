const { Router } = require("express");
const { getUsersDb } = require("../controllers/userController");
const { User } = require("../db");

const router = Router();

module.exports = router;
