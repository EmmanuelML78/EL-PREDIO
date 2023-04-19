const { Router } = require("express");
const bcrypt = require("bcrypt");
const {
  getUsersDb,
  deleteUser,
  updateUser,
  getUsersActive,
  getUsersInactive,
  getUserById,
} = require("../controllers/userController");
const { User } = require("../db");

const router = Router();

// router.get("/users", async (req, res) => {
//   let allUsers = await getUsersDb();
//   try {
//     res.status(200).send(allUsers);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error al obtener los usuarios" });
//   }
// });
// router.get("/users", getUsersDb);
router.get("/users", getUsersActive);
router.get("/users/inactivos", getUsersInactive);

// router.get("/users/:id", async (req, res) => {
//   const id = req.params.id;
//   let allUser = await getUsersDb();
//   try {
//     if (id) {
//       const userId = await allUser.filter((el) => el.id == id);
//       userId.length
//         ? res.status(200).send(userId)
//         : res.status(500).json({ message: "Error al obtener usuario por ID" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "No se encontró el usuario" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener usuario mediante ID" });
  }
});

router.post("/users", async (req, res) => {
  let { name, lastName, email, isAdmin, password, phone } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // const hashPassword = await bcrypt.hash(password, 10);
    let createUser = await User.create({
      name,
      lastName,
      email,
      isAdmin,
      password: hashPassword,
      phone,
    });
    res.status(201).send(createUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
});

router.put("/users/:id", updateUser);

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await deleteUser(id);
    deletedUser
      ? res.status(200).json({ message: "Usuario eliminado con éxito" })
      : res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
});

module.exports = router;
