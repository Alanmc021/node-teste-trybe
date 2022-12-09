import jwt from 'jsonwebtoken';

const SECRET = 'hdHJHJDJ893399HYHHLll232344';

const verififyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const payload = jwt.verify(token, SECRET);
    const { userId, role } = payload;
    req.userId = userId;
    req.role = role;
    next();
  } catch (_error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = verififyToken;