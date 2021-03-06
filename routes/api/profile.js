const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const validateConnectionInput = require('../../validation/connection');
const validate = require('../../middleware/errorValidation');
const getUser = require('../../middleware/getUser');
const showErrors = require('../../validation/error');

const User = require('../../models/User');
// const ProfessionStatus = require('../../models/Profession');

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
    let profile = await Profile.findOne({username: req.params.handle}).populate(
      'user',
      ['name', 'avatar', 'requests', 'connections']
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

router.get('/all', getUser, async (req, res) => {
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
    try {
      let {
        bio,
        company,
        website,
        city,
        province,
        skills,
        status,
        username,
        industryType,
        companySize,
        headquarters,
        founded,
        role,
      } = req.body;
      const profileFields = {
        username,
        bio,
        company,
        website,
        city,
        province,
        skills: skills.split(',') || '',
        status,
        user: req.user.id,
        industryType,
        companySize,
        headquarters,
        founded,
        role,
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
    } catch (error) {
      let {errors} = error;
      if (errors) {
        res.status(400).json(showErrors(errors));
      }
    }
  }
);

router.post(
  '/experience',
  passport.authenticate('jwt', {session: false}),
  validate(validateExperienceInput),
  async (req, res) => {
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
  validate(validateEducationInput),
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
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

    profile.education.unshift(newEdu);
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

router.post(
  '/sendConnectionRequest',
  validate(validateConnectionInput),
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    let user = await User.findById(req.body.connectionId);
    let connectorUser = await User.findById(req.body.connectorId);

    user.requests.indexOf(req.body.connectorId) < 0
      ? user.requests.push({id: connectorUser.id, name: connectorUser.name})
      : null;
    user = await user.save();
    let {id, name, email, role, requests, connections} = user;
    res.json({id, name, email, role, requests, connections});
  }
);

router.post(
  '/acceptConnectionRequest',
  validate(validateConnectionInput),
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    let user = await User.findById(req.body.connectionId);
    let connectorUser = await User.findById(req.body.connectorId);
    if (
      user.connections.filter(conn => conn.id == req.body.connectorId).length <
      1
    ) {
      let removeIndex = user.requests
        .map(item => item.id.toString())
        .indexOf(connectorUser.id);
      user.requests.splice(removeIndex, 1);
      user.connections.push({id: connectorUser.id, name: connectorUser.name});
    }
    user = await user.save();
    let {id, name, email, role, requests, connections} = user;
    res.json({_id: id, name, email, role, requests, connections});
  }
);

router.post(
  '/rejectConnectionRequest',
  validate(validateConnectionInput),
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    let user = await User.findById(req.body.connectionId);
    let connectorUser = await User.findById(req.body.connectorId);
    let removeIndex = user.requests
      .map(item => item.id.toString())
      .indexOf(connectorUser.id);
    user.requests.splice(removeIndex, 1);
    user = await user.save();
    let {id, name, email, role, requests, connections} = user;
    res.json({_id: id, name, email, role, requests, connections});
  }
);

module.exports = router;
