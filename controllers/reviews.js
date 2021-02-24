const axios = require('axios');
const User = require('../models/user');
const Review = require('../models/review')

const postReview = async (req, res, next) => {
  if(!req.query.hasOwnProperty('sellerId')) {
    res.status(404).json({ err: 'sellerId is invalid' })
  } else if(!req.body.hasOwnProperty('reviewValue') || !req.body.hasOwnProperty('comment')) {
    res.status(404).json({ err: 'review value or comments have not been provided' })
  } else if (typeof req.body.reviewValue !== 'number' || typeof req.body.comment !== 'string') {
    res.status(400).json({ err: 'invalid review or comment type' })
  }

  const userId = req.query.sellerId
  const reviewValue = req.body.reviewValue
  const comment = req.body.comment

  const user = await User.findById(userId)
  if(!user) {
    res.status(404).json({ err: 'user does not exist' })
  }

  try {
    let query = Review.create({ reviewValue, comment, user:userId })
    let review = await query
    res.status(200).json({ success: true, review})
  } catch (err) {
    res.status(500).json({ err: 'unable to post review' })
  }
  
}

const getAllUserReviews = async(req, res, next) => {
  if (!req.query.hasOwnProperty('sellerId')) {
    res.status(404).json({ err: 'sellerId is invalid' })
  }

  const userId = req.query.sellerId

  const user = await User.findById(userId)
  if(!user) {
    res.status(404).json({ err: 'user does not exist' })
  }
  try {
    let query = Review.find({ user:userId })

    let reviews = await query
  
    if(reviews.length > 0) {
      res.status(200).json(reviews)
    } else {
      res.status(404).json({ msg: 'no reviews for this user' })
    }
  } catch (err) {
    res.status(500).json({ err: 'unable to view reviews' })
  }

}

module.exports = {
  postReview,
  getAllUserReviews
}