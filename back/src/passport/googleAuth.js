const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../db");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const bcryptjs = require("bcryptjs");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://el-predio.vercel.app/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(
          Math.random().toString(36).substring(7),
          salt
        );
        const [user, created] = await User.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: hashPassword,
          },
        });
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken,
        };
        return done(null, userData);
      } catch (err) {
        console.error(err);
        return done(err);
      }
    }
  )
);
