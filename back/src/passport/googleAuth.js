const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../db");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const bcryptjs = require("bcryptjs");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
      // callbackURL: "http://localhost:3001/auth/google",
      session: false,
    },
    async function (accessToken, refreshToken, profile, done) {
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
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
