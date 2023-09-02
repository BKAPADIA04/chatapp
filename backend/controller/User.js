const UserAccount = require("../model/User.js");
const User = UserAccount.user;

exports.createUser = async (req, res) => {
  let success = true;
  try {
    const user = new User(req.body);
    const doc = await user.save();
    res.json({"success":success,"user":user});
  } catch (err) {
    success = false;
    console.log(err);
    res.json({"success":success,"error":err});
  }
};
