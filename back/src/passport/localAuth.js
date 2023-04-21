const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db");
const { comparePassword } = require("../controllers/userController");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, {
            message: "El email o la contraseña son incorrectos",
          });
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          return done(null, false, {
            message: "El email o la contraseña son incorrectos",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
