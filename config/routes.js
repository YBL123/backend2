const router = require('express').Router()
const {signIn, signUp} = require('../controllers/auth')
const {getAllUsers} = require('../controllers/users')
const {postReview} = require('../controllers/reviews')
const secureRoute = require('../lib/secureRoute')

router.route('/signup')
  .post(signUp)

router.route('/login')
  .post(signIn)

router.route('/users/getAllSellers')
  .get(getAllUsers)

router.route('/review')
  .post(postReview)

module.exports = router
