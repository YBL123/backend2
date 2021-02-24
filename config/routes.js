const router = require('express').Router()
const {signIn, signUp} = require('../controllers/auth')
const {getAllUsers, getNearestUser} = require('../controllers/users')
const {postReview, getAllUserReviews} = require('../controllers/reviews')
const secureRoute = require('../lib/secureRoute')

router.route('/signup')
  .post(signUp)

router.route('/login')
  .post(signIn)

router.route('/users/getAllSellers')
  .get(getAllUsers)

router.route('/review')
  .post(postReview)

router.route('/getSellerReviews')
  .get(getAllUserReviews)

router.route('/getNearestSellers')
  .get(getNearestUser)

module.exports = router
