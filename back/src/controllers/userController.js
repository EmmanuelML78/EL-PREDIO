const { User } = require("../db");

const getUsersDb = async () => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

module.exports = { getUsersDb };
