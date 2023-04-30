const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "promotion",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(["time", "date", "advance"]),
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
      },
      endTime: {
        type: DataTypes.TIME,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      advanceDays: {
        type: DataTypes.INTEGER,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    { paranoid: true }
  );
};
