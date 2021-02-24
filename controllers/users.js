const axios = require('axios');
const User = require('../models/user');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ msg: err })
  }
};



module.exports = {
  getAllUsers
};
