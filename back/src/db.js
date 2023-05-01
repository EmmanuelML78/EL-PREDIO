require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
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

const { User, Reserva, Cancha, Review, Promotion } = sequelize.models;

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

User.hasMany(Review, { as: "review", foreignKey: "userId" });
User.hasMany(Reserva, {
  onDelete: "Cascade",
  onUpdate: "Cascade",
});
Review.belongsTo(User, { as: "user", foreignKey: "userId" });

Promotion.belongsToMany(Cancha, { through: "cancha_promotion" });
Cancha.belongsToMany(Promotion, { through: "cancha_promotion" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
