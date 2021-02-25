const authRouter = require('express').Router();
const { signIn, signUp } = require('../controllers/auth');

authRouter.route('/signup').post(signUp);

authRouter.route('/login').post(signIn);

module.exports = authRouter;
