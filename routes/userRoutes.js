const userRouter = require('express').Router();
const { getAllUsers, getNearestUser } = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

userRouter.route('/users/getAllSellers').get(getAllUsers);
userRouter.route('/getNearestSellers').get(secureRoute, getNearestUser);

module.exports = userRouter;
