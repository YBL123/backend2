const router = require('express').Router();
const { signIn, signUp } = require('../controllers/auth');
const { getAllUsers, getNearestUser } = require('../controllers/users');
const { postReview, getAllSingleUserReviews } = require('../controllers/reviews');
const secureRoute = require('../lib/secureRoute');

router.route('/signup').post(signUp);

router.route('/login').post(signIn);

router.route('/users/getAllSellers').get(getAllUsers);

router.route('/review').post(secureRoute, postReview);

router.route('/getSellerReviews').get(getAllSingleUserReviews);

router.route('/getNearestSellers').get(secureRoute, getNearestUser);

module.exports = router;
