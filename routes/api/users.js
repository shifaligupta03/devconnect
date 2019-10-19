const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
let saltRounds = 10;
const passport = require("passport");
const validate = require("../../middleware/errorValidation");
const validateRegisterSchema = require("../../validation/register");
const validateLoginInput = require("../../validation/Login");
const showErrors = require("../../validation/error");

router.post("/register", validate(validateRegisterSchema), async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    let avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    const newUser = new User({ name, email, avatar, password, role });
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;
    user = await newUser.save();
    res.json(user);
  } catch (error) {
    let { errors } = error;
    if (errors) {
      res.status(400).json(showErrors(errors));
    }
  }
});

router.post("/login", validate(validateLoginInput), async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    let isMatch = user.password
      ? await bcrypt.compare(password, user.password)
      : false;
    if (!user || !isMatch) {
      return res.status(404).json({email:"Incorrect email or password"});
    }
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      requests: user.requests,
      connections: user.connections
    };
    const token = await jwt.sign(payload, keys.jwtSecret, { expiresIn: 3600 });
    res.json({ success: true, token: "Bearer " + token });
  } catch (error) {
    console.log(error);
    let { errors } = error;
    if (errors) {
      res.status(400).json(showErrors(errors));
    }
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log('gfdhfg');
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      requests: req.user.requests,
      connections: req.user.connections,
    });
  }
);

module.exports = router;
