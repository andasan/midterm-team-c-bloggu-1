const mongoose = require("mongoose");
const User = require("../model/user");

exports.signup = async (req, res) => {
  console.log(req.body);
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });
  console.log(user);
  try {
    if (!user) {
      return res.send("signin was failed");
    }
    await user.save();
    return res.status(201).send({ user });
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.signin = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  user.email = undefined;
  user.password = undefined;
  user.createdAt = undefined;
  user.updatedAt = undefined;

  console.log(user);

  if (user) {
    // res.redirect("/");
    res.send({ user: user });
    // console.log(user);
  } else {
    res.send({
      msg: "User doesn't exsist"
    });
  }
};
