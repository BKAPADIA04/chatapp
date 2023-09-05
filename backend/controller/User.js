require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserAccount = require("../model/User.js");
const User = UserAccount.user;

exports.createUser = async (req, res) => {
  let success = true;
  try {
    const errors = validationResult(req);
    const arr = errors.array();
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success: success, error: arr });
    }

    const prevUser = {
      Email: await User.findOne({ emailid: req.body.emailid }),
      DisplayName: await User.findOne({ displayName: req.body.displayName }),
    };

    if (!!prevUser.Email) {
      success = false;
      return res
        .status(400)
        .json({
          success: success,
          error: "Account with this emailid already exists",
        });
    }

    if (!!prevUser.DisplayName) {
      success = false;
      return res
        .status(400)
        .json({
          success: success,
          error: "Account with this display name already exists",
        });
    }
    try {
      const user = new User(req.body);
      const password = req.body.password;
      const saltNo = process.env.Salt;
      const salt = await bcrypt.genSalt(+saltNo);
      const secPass = await bcrypt.hash(password, salt);
      user.password = secPass;
      try {
        const doc = await user.save();
        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(data, `${process.env.JWT_SECRET}`);
        res.status(201).json({ success: success, authToken: authToken });
      } catch (saveError) {
        console.error(saveError);
        success = false;
        res.status(500).json({ success: success, error: "User Save Error" });
      }
    } catch (userCreationError) {
      console.error(userCreationError);
      success = false;
      res.status(500).json({ success: success, error: "User Creation Error" });
    }
  } catch (validationError) {
    console.error(validationError);
    success = false;
    res.status(400).json({ success: success, error: validationError.array() });
  }
};

exports.changePassword = async (req,res) => {
  const {password,newPassword} = req.body;
  const saltNo = process.env.Salt;
  const salt = await bcrypt.genSalt(+saltNo);
  const secPass = await bcrypt.hash(password, salt);
  // const currentUser = await User.findOne({displayName: req.body.displayName });
  // const passwordDB = currentUser.password;
  console.log(secPass);
  res.send("Hi");
};

exports.decodeUser = async (req,res) => {
  try {
    const id = req.user.id;
    // const user = await User.findOne({_id : id});
    const {newPassword} = req.body;
    const saltNo = process.env.Salt;
    const salt = await bcrypt.genSalt(+saltNo);
    const secPass = await bcrypt.hash(newPassword, salt);
    // user.password = secPass;
    const userWithNewPassword = await User.findByIdAndUpdate(id,{password:secPass});
    res.send(userWithNewPassword);
  } catch (err) {
    console.error(err);
    res.status(500).json({error : "Internal Server Error"});
  }
}