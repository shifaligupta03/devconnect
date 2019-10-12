const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
let saltRounds = 10;
const passport = require('passport');
const validate = require('../../middleware/errorValidation');
const validateRegisterSchema = require('../../validation/register');
const validateLoginInput = require('../../validation/Login');
const showErrors = require('../../validation/error');

router.post('/register', validate(validateRegisterSchema), async (req, res) => {
  try {
    let {name, email, password} = req.body;
    let avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
    const newUser = new User({name, email, avatar, password});
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;
    user = await newUser.save();
    res.json(user);
  } catch (error) {
    let {errors} = error;
    if (errors) {
      res.status(400).json(showErrors(errors));
    }
  }
});

router.post('/login', validate(validateLoginInput), async (req, res) => {
  const {email, password} = req.body;
  let user = await User.findOne({email});
  let isMatch = await bcrypt.compare(password, user.password);
  if (!user || !isMatch) {
    errors.email = 'Incorrect username or password';
    return res.status(404).json(errors);
  }
  const payload = {id: user.id, name: user.name, avatar: user.avatar};
  const token = await jwt.sign(payload, keys.jwtSecret, {expiresIn: 3600});
  res.json({success: true, token: 'Bearer ' + token});
});

router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json({id: req.user.id, name: req.user.name, email: req.user.email});
  }
);

module.exports = router;
