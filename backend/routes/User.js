const express = require('express');
const userRouter = express.Router();
const User = require('../controller/User.js');
const { body } = require('express-validator');

userRouter.post('/signup',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('displayName','Enter a valid displayName').isLength({min : 3}),
    body('emailid','Enter a valid email address').isEmail(),
    body('password','Password should atleast have 5 characters').isLength({min : 5}),
    body('dob','Date needs to be a valid date').isDate({format:'DD/MM/YYYY'})
],User.createUser);


exports.userRoute = userRouter;