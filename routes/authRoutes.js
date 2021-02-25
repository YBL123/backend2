const authRouter = require('express').Router();
const { signIn, signUp } = require('../controllers/auth');

authRouter.route('/users/signup').post(signUp);

authRouter.route('/users/login').post(signIn);

module.exports = authRouter;
