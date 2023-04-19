const { User, Reserva } = require("../db");
const { Op } = require("sequelize");

const getUsersDb = async () => {
  try {
    const users = await User.findAll({ paranoid: false });
    return users;
  } catch (error) {
    console.log(error);
  }
};

const getUsersInactive = async (req, res) => {
  try {
    const name = req.query.name;
    let users;
    if (name) {
      users = await User.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `${name}%` } },
            { lastName: { [Op.iLike]: `${name}%` } },
            {
              [Op.and]: [
                { name: { [Op.iLike]: `${name.split(" ")[0]}%` } },
                { lastName: { [Op.iLike]: `${name.split(" ")[1]}%` } },
              ],
            },
          ],
          deletedAt: { [Op.not]: null }, // filtra solo usuarios inactivos
        },
        paranoid: false,
      });
    } else {
      users = await User.findAll({
        where: {
          deletedAt: { [Op.not]: null }, // filtra solo usuarios inactivos
        },
        paranoid: false,
      });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const getUsersActive = async (req, res) => {
  try {
    const name = req.query.name;
    let users;
    if (name) {
      users = await User.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `${name}%` } },
            { lastName: { [Op.iLike]: `${name}%` } },
            {
              [Op.and]: [
                { name: { [Op.iLike]: `${name.split(" ")[0]}%` } },
                { lastName: { [Op.iLike]: `${name.split(" ")[1]}%` } },
              ],
            },
          ],
        },
        // paranoid: false,
      });
    } else {
      users = await User.findAll();
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      include: { model: Reserva, as: "reservas", paranoid: false },
      paranoid: false,
    });
    return user;
  } catch (error) {
    console.error(error);
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
  const { name, lastName, email, password, phone, isAdmin, deletedAt } =
    req.body;
  try {
    const user = await User.findByPk(id, { paranoid: false });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (deletedAt === null) {
      // Restaurar usuario eliminado
      await user.restore();
    }

    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.isAdmin = isAdmin || user.isAdmin;
    user.password = password || user.password;
    user.phone = phone !== undefined ? phone : user.phone;
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
  getUsersActive,
  getUsersInactive,
  getUserById,
};
