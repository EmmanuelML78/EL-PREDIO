const jwt = require("jsonwebtoken");
const { User } = require("../db");

const authMiddleware = async (req, res, next) => {
  try {
    let user = null;
    if (req.isAuthenticated()) {
      user = req.user;
    } else if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      user = await User.findByPk(userId);
    }

    // if (!user) {
    //   throw new Error();
    // }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token expirado" });
    } else {
      res.status(401).json({ error: "Acceso no autorizado" });
    }
  }
};

const adminMiddleware = async (req, res, next) => {
  try {
    let user = null;
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        user = req.user;
      }
    } else if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      user = await User.findByPk(userId);
      if (!user.isAdmin) {
        throw new Error();
      }
    }

    // if (!user) {
    //   throw new Error();
    // }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token expirado" });
    } else {
      res.status(401).json({ error: "Acceso no autorizado" });
    }
  }
};
const authGoogleMid = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "No autorizado" });
  }
};

module.exports = { authMiddleware, adminMiddleware, authGoogleMid };
