const jwt = require('jsonwebtoken');
const config = require('config');

// middleware has access to request and response cylces, next is a callback we have to run once we're done to go onto next piece of middleware
module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
