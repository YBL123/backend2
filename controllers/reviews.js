const User = require('../models/user');
const Review = require('../models/review');

const postReview = async (req, res, next) => {
  try {
    if (!req.query.hasOwnProperty('sellerId')) {
      res.status(404).json({ err: 'sellerId is invalid' });
    } else if (
      !req.body.hasOwnProperty('reviewValue') ||
      !req.body.hasOwnProperty('comment')
    ) {
      return res
        .status(404)
        .json({ err: 'review value or comments have not been provided' });
    } else if (
      typeof req.body.reviewValue !== 'number' ||
      typeof req.body.comment !== 'string'
    ) {
      return res.status(400).json({ err: 'invalid review or comment type' });
    }

    const userId = req.query.sellerId;
    const reviewValue = req.body.reviewValue;
    const comment = req.body.comment;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ err: 'user does not exist' });
    }

    const query = Review.create({ reviewValue, comment, user: userId });
    const review = await query;
    return res.status(200).json({ success: true, review });
  } catch (err) {
    return res.status(500).json({ err: 'unable to post review' });
  }
};

const getAllSingleUserReviews = async (req, res, next) => {
  try {
    if (!req.query.hasOwnProperty('sellerId')) {
      return res.status(404).json({ err: 'sellerId is invalid' });
    }

    const userId = req.query.sellerId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ err: 'user does not exist' });
    }

    const query = Review.find({ user: userId });

    const reviews = await query;

    return res.status(200).json(reviews);
    
  } catch (err) {
    return res.status(500).json({ err: 'unable to view reviews' });
  }
};

module.exports = {
  postReview,
  getAllSingleUserReviews,
};
