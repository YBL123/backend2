const authRouter = require('express').Router();
const { signIn, signUp } = require('../controllers/auth');
// const { getAllUsers, getNearestUser } = require('../controllers/users');
// const { postReview, getAllSingleUserReviews } = require('../controllers/reviews');
// const secureRoute = require('../lib/secureRoute');

authRouter.route('/signup').post(signUp);

authRouter.route('/login').post(signIn);

// router.route('/users/getAllSellers').get(getAllUsers);

// router.route('/review').post(secureRoute, postReview);

// router.route('/getSellerReviews').get(getAllSingleUserReviews);

// router.route('/getNearestSellers').get(secureRoute, getNearestUser);

module.exports = authRouter;
