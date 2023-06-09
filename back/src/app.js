const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

require("./db.js");
require("./passport/localAuth.js");
require("./passport/googleAuth.js");
require("./middlewares/auth.js");

const app = express();

app.name = "API";

// app.use(cors());
const corsOptions = {
  origin: "https://el-predio.vercel.app",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://el-predio.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(
  session({
    secret: "unasecretaclave",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Utilizar sólo en producción true
      maxAge: 24 * 60 * 60 * 1000, // Tiempo de vida de la cookie en milisegundos (24 horas en este caso)
    },
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use("/", routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
