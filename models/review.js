const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Each review has to fit this schema criteria
const reviewSchema = new Schema(
  {
    reviewValue: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
      required: true,
    },
    comment: { type: String, required: true },
    user: { type: Schema.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Review', reviewSchema);