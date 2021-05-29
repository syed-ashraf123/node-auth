const router = require("express").Router();
const { registerValidation } = require("./validation");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
router.post("/", async (req, res) => {
  //Validating Data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });

  //If email is present or not
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send({ msg: "Already Registered" });

  //Hashing the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Saving in Database // Creating a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  const savedUser = await user.save();
  return res.status(200).send({ use: savedUser });
});

module.exports = router;
