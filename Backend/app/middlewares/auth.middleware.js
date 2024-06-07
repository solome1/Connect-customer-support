const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.userId = decodedToken.id;
    next();
  });
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Unauthorized.' });
      }

      next();
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'Some error occurred while verifying the user.',
      });
    });
};