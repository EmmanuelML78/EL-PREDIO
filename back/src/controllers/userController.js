const { User } = require("../db");

const getUsersDb = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsersDb };
