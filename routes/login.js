const router = require("express").Router();
const { loginValidation } = require("./validation");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  //Validating Data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });

  //If email is present or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ msg: "Not Existing User" });

  //Validating Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ msg: "Wrong Credentials" });

  //JWT Create & Assign Token
  const token = jwt.sign({ _id: user._id }, "khfwldkf445afadsj");
  res.send({ authToken: token });
});

module.exports = router;
