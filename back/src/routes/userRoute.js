const { Router } = require("express");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
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

// router.post("/login", async (req, res) => {
//   try {
//     const authenticate = promisify(
//       passport.authenticate("local", { session: false })
//     );
//     // console.log("authenticate:", authenticate);
//     const [user, info] = await authenticate(req, res);

//     if (!user) {
//       // console.log(info);
//       return res.status(401).json({ message: info.message });
//     }

//     const token = await jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({ token });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Error al iniciar sesión" });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const user = await new Promise((resolve, reject) => {
      passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return reject(new Error(info.message));
        }
        resolve(user);
      })(req, res);
    });

    const token = await jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

router.get("/users", getUsersActive);
router.get("/users/inactivos", getUsersInactive);

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
