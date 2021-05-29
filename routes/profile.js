const router = require("express").Router();
const User = require("../models/User");
const verify = require("./verifyToken");
router.get("/", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  res.send(user);
});

module.exports = router;
