const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "balance",
    {
      cierreCaja: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { paranoid: true }
  );
};
