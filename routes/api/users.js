const express = require('express');
const router = express.Router();
// users Model
const Users = require('../../models/Users');

// @routes GET api/users
// @desc GET ALL USERS
router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    if (!users) throw Error('No Users');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routes POST api/users
// @desc CREATE A USER
router.post('/', async (req, res) => {
  const newUser = new Users(req.body);

  try {
    const user = await newUser.save();
    if (!user) throw Error('Something went wrong cerating the user');

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routes DELETE api/users/:id
// @desc DELETE A USER
router.delete('/:id', async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) throw Error('No user found!');

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routes UPDATE api/users/:id
// @desc UPDATE A USER
router.patch('/:id', async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body);
    if (!user) throw Error('Something went wrong while updating the user');

    res.status(200).json({ success: true });

  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routes GET api/users/:id
// @desc GET SINGLE USER
router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) throw Error('No items');

    res.status(200).json(user);
    
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
