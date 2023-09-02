const express = require('express');
const userRouter = express.Router();
const User = require('../controller/User.js');

userRouter.post('/',User.createUser);


exports.userRoute = userRouter;