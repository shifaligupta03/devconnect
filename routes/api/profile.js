const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const validate = require('../../middleware/errorValidation');

const User = require('../../models/User');

router.get('/test', (req, res) => res.json({msg: 'profile'}));

router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const errors = {};
      let profile = await Profile.findOne({user: req.user.id}).populate(
        'user',
        ['name', 'avatar']
      );
      if (!profile) {
        errors.noprofile = 'There is no profile with this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    } catch (err) {
      console.log(err);
    }
  }
);

router.get('/handle/:handle', async (req, res) => {
  try {
    const errors = {};
    let profile = await Profile.findOne({handle: req.params.handle}).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    res.json(profile);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
});

router.get('/user/:user_id', async (req, res) => {
  try {
    const errors = {};
    let profile = await Profile.findOne({user: req.params.user_id}).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    res.json(profile);
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({noprofile: 'There is no profile with this user'});
  }
});

router.get('/all', async (req, res) => {
  try {
    const errors = {};
    let profile = await Profile.find().populate('user', ['name', 'avatar']);
    if (!profile) {
      errors.noprofile = 'There are no profiles';
      return res.status(404).json(errors);
    }
    res.json(profile);
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({noprofile: 'There is no profile with this user'});
  }
});

router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  validate(validateProfileInput),
  async (req, res) => {
    let {bio, company, website, city, province, skills, status} = req.body;
    const profileFields = {
      bio,
      company,
      website,
      city,
      province,
      skills: skills.split(',') || '',
      status,
      user: req.user.id,
    };
    let profile = await Profile.findOne({user: req.user.id});
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set: profileFields},
        {new: true}
      );
    } else {
      profile = new Profile(profileFields);
      profile = await profile.save();
    }
    res.json(profile);
  }
);

router.post(
  '/experience',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {errors, isValid} = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let profile = await Profile.findOne({user: req.user.id});
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };

    profile.experience.unshift(newExp);
    profile = await profile.save();
    res.json(profile);
  }
);

router.post(
  '/education',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {errors, isValid} = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let profile = await Profile.findOne({user: req.user.id});
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldOfStudy: req.body.fieldOfStudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };

    profile.experience.unshift(newExp);
    profile = await profile.save();
    res.json(profile);
  }
);

router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({user: req.user.id});
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);
      profile = await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({user: req.user.id});
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);
      profile = await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

router.delete(
  '/',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let profile = await Profile.findOneAndRemove({user: req.user.id});
      let user = await User.findOneAndRemove({_id: req.user.id});
      res.json({success: true});
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

module.exports = router;
