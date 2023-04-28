const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares/auth");

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
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.redirect("http://localhost:5173/home");
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

module.exports = router;
