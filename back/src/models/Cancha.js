const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cancha",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      open: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      close: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      hasPromo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false, paranoid: true }
  );
};
