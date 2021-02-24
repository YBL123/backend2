const User = require('../models/user');
const jwt = require('jsonwebtoken');

// array for all keys needed to sign in

const signUp = async (req, res, next) => {
  // iterate over keys array to check if all are present

  try {
    let query = User.create(req.body);
    let user = await query;

    query = User.findOne({ _id: user._id });
    query.select('-_id -__v -id +password');

    user = await query;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(422).json(err);
  }
};

const signIn = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error();
    }

    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' });

    res.status(202).json({
      message: `Welcome back ${user.firstName}`,
      token,
    });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  signUp,
  signIn,
};
