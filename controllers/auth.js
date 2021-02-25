const User = require('../models/user');
const jwt = require('jsonwebtoken');

// array for all keys needed to sign in
const userKeysArr = [
  'email',
  'password',
  'username',
  'firstName',
  'lastName',
  'address',
  'typeOfUser',
  'profession',
  'longitude',
  'latitude',
];

const signUp = async (req, res, next) => {
  try {
    // iterate over keys array to check if all are present
    userKeysArr.forEach((key) => {
      if (!req.body.hasOwnProperty(key)) {
        res.status(404).json({ err: 'one or more invalid fields' });
      }
    });

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
  try {
    if (process.env === undefined) {
      res.status(500).json({ err: 'Unable to sign in' });
    }
    const secret = process.env.JWT_SECRET;

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
