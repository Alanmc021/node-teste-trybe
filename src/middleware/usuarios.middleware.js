import jwt from 'jsonwebtoken';

const SECRET = 'paranguaricutirimiruarum';

// function VerififyToken(req, res, next) {
//   const token = req.headers.authorization;

//   jtw.verify(token, SECRET, (err) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     return next();
//   });
// }

const VerififyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const payload = jwt.verify(token, SECRET);
    // console.log(payload);
    const { userId } = payload;
    req.userId = userId;
    next();
  } catch (_error) {
    res.status(401).json({ message: 'jwt malformed' });
  }


};

export default VerififyToken;
