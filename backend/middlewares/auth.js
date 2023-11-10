const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "Token não fornecido. Acesso não autorizado." });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ msg: "Token expirado. Faça login novamente para obter um novo token." });
      }
      return res.status(401).json({ msg: "Token inválido. Acesso não autorizado." });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyTokenMiddleware };
