const reviewRouter = require('express').Router();
const { postReview, getAllSingleUserReviews } = require('../controllers/reviews');
const secureRoute = require('../lib/secureRoute');

reviewRouter.route('/review').post(secureRoute, postReview);
reviewRouter.route('/getSellerReviews').get(getAllSingleUserReviews);

module.exports = reviewRouter;
