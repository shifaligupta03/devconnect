const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  let token = req.headers['authorization']|| null;
  if(token){
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.user = decoded.id;
  }
  next();
};
