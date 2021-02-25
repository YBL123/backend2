const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, maxlength: 50 },
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  address: { type: String, required: true, maxlength: 1000 },
  typeOfUser: { type: String, enum: ['seller', 'client'] },
  profession: { type: String, required: true, maxlength: 500 },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
});

//AUTH
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

module.exports = mongoose.model('User', userSchema);
