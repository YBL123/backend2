const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
// users Model
const Users = require('../../models/Users');

// @routes POST api/signUp
// @desc SIGN UP
router.post('/signUp', async (req, res) => {
  try {
    let query = Users.create(req.body)
    let user = await query
    
    query = Users.findOne({ _id: user._id })
    query.select('-_id -__v -id +password')

    user = await query
  
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    res.status(422).json(err)
  }
})

// @routes POST api/signIn
// @desc SIGN IN
router.post('/signIn', async (req, res) => {
  const secret = process.env.JWT_SECRET
  try {
    console.log('user wanted: ', req.body)
    const user = await Users.findOne({ email: req.body.email })
    console.log('user found: ', user)

    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error()
    }

    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' })
    
    res.status(202).json({ 
      message: `Welcome back ${user.firstName}`,
      token
    })

  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' })
  }
})

module.exports = {
  signUp, signIn
}