require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/elpredio`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Reserva, Cancha } = sequelize.models;

User.hasMany(Reserva, { as: "reservas", foreignKey: "userId" });
User.hasMany(Reserva, {
  onDelete: "Cascade",
  onUpdate: "Cascade",
});
Cancha.hasMany(Reserva, { as: "reservas", foreignKey: "canchaId" });
Cancha.hasMany(Reserva, {
  onDelete: "Cascade",
  onUpdate: "Cascade",
});

Reserva.belongsTo(User, { as: "user", foreignKey: "userId" });
Reserva.belongsTo(Cancha, { as: "cancha", foreignKey: "canchaId" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
