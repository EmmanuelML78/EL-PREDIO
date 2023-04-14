const { User } = require("../db");

const getUsersDb = async () => {
  try {
    const users = await User.findAll({ paranoid: false });
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

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, password, phone, isAdmin } = req.body;
  try {
    const user = await User.findOne({ where: { id }, paranoid: false });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.password = password || user.password;
    user.phone = phone || user.phone;
    user.isAdmin = isAdmin || user.isAdmin;
    await user.save();
    res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

module.exports = {
  getUsersDb,
  deleteUser,
  updateUser,
};
