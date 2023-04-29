const { Router } = require("express");
const bcryptjs = require("bcryptjs");
const {
  getUsersDb,
  deleteUser,
  updateUser,
  getUsersActive,
  getUsersInactive,
  getUserById,
} = require("../controllers/userController");
const { User, Reserva, Cancha } = require("../db");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth");
const { enviarCorreo } = require("../controllers/nodemailerControllers");

const router = Router();

//traer users activos-inactivos
router.get("/users", authMiddleware, getUsersActive);
router.get("/users/inactivos", authMiddleware, getUsersInactive);

//traer user por ID
router.get("/users/:id", authMiddleware, async (req, res) => {
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

//traer user autenticado
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Reserva,
          as: "reservas",
          paranoid: false,
          include: { model: Cancha, as: "cancha" },
        },
      ],
      paranoid: false,
    });
    if (!user) {
      return res.status(404).json({ message: "No se encontró el usuario" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

//crear user
router.post("/users", async (req, res) => {
  let { name, lastName, email, isAdmin, password, phone } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    let createUser = await User.create({
      name,
      lastName,
      email,
      isAdmin,
      password: hashPassword,
      phone,
    });
    enviarCorreo(
      name,
      email,
      "Se registro con exito",
      "Bienvenido al predio"
    );
    res.status(201).send(createUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
});

//modificar user
router.put("/users/:id", authMiddleware, updateUser);

router.put("/me", authMiddleware, async (req, res) => {

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { name, lastName, email, password, phone, image } = req.body;

    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.image = image || user.image;

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);
      user.password = hashPassword;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

//eliminar user
router.delete("/users/:id", authMiddleware, async (req, res) => {
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
