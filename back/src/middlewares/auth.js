const jwt = require("jsonwebtoken");
const { User } = require("../db");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    // catch (error) {
    //   res.status(401).json({ error: "Acceso no autorizado" });
    // }
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token expirado" });
    } else {
      res.status(401).json({ error: "Acceso no autorizado" });
    }
  }
};

module.exports = authMiddleware;
