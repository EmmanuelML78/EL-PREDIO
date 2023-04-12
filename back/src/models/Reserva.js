const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "reserva",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      start: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      hasPromo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { paranoid: true }
  );
};
