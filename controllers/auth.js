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
        return res.status(404).json({ err: 'one or more invalid fields' });
      }
    });

    if (
      typeof req.body.email !== 'string' ||
      typeof req.body.firstName !== 'string' ||
      typeof req.body.lastName !== 'string' ||
      typeof req.body.address !== 'string' ||
      typeof req.body.typeOfUser !== 'string' ||
      typeof req.body.profession !== 'string'
    ) {
      return res.status(404).json({ err:'email, firstName, lastname, address, typeOfUser, profession type must be strings'});
    }

    //creating a new user and spreading to make sure that only these keys matchning the above are permitted to go through
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      typeOfUser: req.body.typeOfUser,
      profession: req.body.profession,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    };

    //passing in newUser that contains only the desired keys
    let query = User.create(newUser);
    let user = await query;

    query = User.findOne({ _id: user._id });
    query.select('-_id -__v -id +password');

    user = await query;

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(422).json(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    if (process.env === undefined) {
      return res.status(500).json({ err: 'Unable to sign in' });
    }
    const secret = process.env.JWT_SECRET;

    const user = await User.findOne({ email: req.body.email });

    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error();
    }

    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' });

    return res.status(202).json({
      message: `Welcome back ${user.firstName}`,
      token,
    });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  signUp,
  signIn,
};
