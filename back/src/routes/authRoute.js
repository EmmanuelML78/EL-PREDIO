const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { sendResetPassword } = require("../controllers/nodemailerControllers");

const router = Router();

//login local
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Error al iniciar sesión" });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al iniciar sesión" });
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token });
    });
  })(req, res, next);
});

//login Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    return res.redirect("https://el-predio.vercel.app/misreservas");
  }
);

//logout Google
router.get("/logout", (req, res) => {
  try {
    req.logout();
    req.session.destroy();
    res.clearCookie("connect.sid", { path: "/" });
    res.status(200).json({ message: "Haz cerrado sesión con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al cerrar sesión" });
  }
});

//solicitar recuperación de password
router.post("/forgot-password", async (req, res, next) => {
  let { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No se encontró una cuenta con ese email" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expiresAt = Date.now() + 3600000;
    await user.update({ resetToken: token, resetExpires: expiresAt });

    const resetPasswordUrl = `${req.protocol}://${req.headers.host}/reset-password/${token}`;
    await sendResetPassword(user.email, resetPasswordUrl);

    res.status(200).json({
      message:
        "Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña",
    });
  } catch (error) {
    next(error);
  }
});

//Verificar solicitud
router.get("/reset-password/:token", async (req, res, next) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "El token es inválido o ha expirado" });
    }
    const expiresAt = new Date(user.resetExpires).getTime();
    const now = Date.now();
    if (now > expiresAt) {
      return res.status(400).json({ message: "El token ha expirado" });
    }
    res.status(200).json({ message: "Token válido" });
  } catch (error) {
    next(error);
  }
});

//Nuevo password
router.post("/reset-password/:token", async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "El token inválido o ha expirado" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const updatedUser = await user.update({
      password: hashPassword,
      resetToken: null,
      resetExpires: null,
    });

    res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
