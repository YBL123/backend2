const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
    user: { type: Schema.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, maxlength: 50 },
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  address: { type: String, required: true, maxlength: 1000 },
  typeOfUser: { type: String, enum: ['seller', 'client'] },
  profession: { type: String, required: true, maxlength: 500 }, //! unless its a client it can be nil
  longitude: { type: Number, required: true, maxlength: 2000 },
  latitude: { type: Number, required: true, maxlength: 2000 },
  reviews: [reviewSchema],
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.virtual('passwordConfirmation').set(function (passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
});

userSchema.pre('validate', function (next) {
  if (
    this.isModified('password') &&
    this._passwordConfirmation !== this.password
  ) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Users', userSchema);
