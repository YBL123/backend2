const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secureRoute = async (req, res, next) => {
  try {
    const secret = process.env.JWT_SECRET;
    if(secret === undefined) {
      res.status(500).json({ err: 'Server failure' })
    }

    if (!req.headers.authorization) throw new Error();

    const token = req.headers.authorization.replace('Bearer ', '');

    const payload = await jwt.verify(token, secret);

    const user = await User.findById(payload.sub);

    if (!user) throw new Error();

    req.currentUser = user;

    next();
  } catch (err) {
    res.status(401).json({ mesg: 'Unauthorized - please provide the JWT token in the request header after bearer' });
  }
};

module.exports = secureRoute;
