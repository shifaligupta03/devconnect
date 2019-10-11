const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
let saltRounds = 10;
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/Login');

router.get('/test', (req, res) => res.json({msg: 'users'}));

router.post('/register', async (req, res) => {
  try {
    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid) return res.status(404).json(errors);
    let user = await User.findOne({email: req.body.email});
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }
    let {name, email, password} = req.body;
    let avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
    const newUser = new User({name, email, avatar, password});
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;
    user = await newUser.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);
  if (!isValid) return res.status(404).json(errors);
  const {email, password} = req.body;
  let user = await User.findOne({email});
  if (!user) {
    errors.email = 'User not found';
    return res.status(404).json(errors);
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    errors.password = 'Password incorrect';
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
