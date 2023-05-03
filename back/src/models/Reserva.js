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
        defaultValue: "cancelled",
      },
      hasPromo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      id_pago: {
        type: DataTypes.STRING, // o el tipo de dato adecuado
        allowNull: true, // o false si es obligatorio
      },
    },
    { paranoid: true }
  );
};
