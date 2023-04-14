const { User } = require("../db");

const getUsersDb = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.destroy({ where: { id: id } });
    return deletedUser;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsersDb,
  deleteUser,
};
