const express = require('express');
const router = express.Router();
const passport = require('passport');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const validate = require('../../middleware/errorValidation');
const validatePostInput = require('../../validation/post');
const getUser = require('../../middleware/getUser');

router.get('/', getUser, async (req, res) => {
  try {
    let loggedinUser = await User.findById(req.user);
    let connectionsArray = loggedinUser.connections.map(user => user.id);
    let posts = await Post.find({user: {$in: connectionsArray}}).sort({
      date: -1,
    });
    res.send(posts);
  } catch (err) {
    res.status(404).json({nopostfound: 'No Posts found'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    res.send(post);
  } catch (err) {
    res.status(404).json({nopostfound: 'No Post found with that ID'});
  }
});

router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  validate(validatePostInput),
  async (req, res) => {
    try {
      let {text, name, avatar} = req.body;
      const newPost = new Post({
        text,
        name,
        avatar,
        user: req.user.id,
      });

      let post = await newPost.save();
      res.json(post);
    } catch (error) {
      let {errors} = error;
      if (errors) {
        res.status(400).json(showErrors(errors));
      }
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({user: req.user.id});
      let post = await Post.findById(req.params.id);
      let jsonRes = {notAuthorized: 'User not Authorized'};
      if (post.user == req.user.id) {
        await post.remove();
        jsonRes = {success: true};
      }
      res.json(jsonRes);
    } catch (err) {
      res.status(404).json({nopostfound: 'No Post found'});
    }
  }
);

router.post(
  '/like/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({user: req.user.id});
      let post = await Post.findById(req.params.id);
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length
      ) {
        return res
          .status(400)
          .json({alreadyLiked: 'User Already liked this post'});
      }
      post.likes.unshift({user: req.user.id});
      post = await post.save();
      res.json(post);
    } catch (err) {
      res.status(400).json({postNotFound: 'No Post Found'});
    }
  }
);

router.post(
  '/unlike/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({user: req.user.id});
      let post = await Post.findById(req.params.id);
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length
      ) {
        let removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        await post.likes.splice(removeIndex, 1);
        post = await post.save();
      }
      res.json(post);
    } catch (err) {
      res.status(400).json({postNotFound: 'No Post Found'});
    }
  }
);

router.post(
  '/comment/:id',
  passport.authenticate('jwt', {session: false}),
  validate(validatePostInput),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      let {text, name, avatar} = req.body;
      const newComment = {
        text,
        name,
        avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      post = await post.save();
      res.json(post);
    } catch (error) {
      let {errors} = error;
      if (errors) {
        res.status(400).json(showErrors(errors));
      }
      // res.status(400).json({postNotFound: 'No Post Found'});
    }
  }
);

router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({commentNotExist: 'Comment does not exist'});
      }

      let removeByIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeByIndex, 1);
      post = await post.save();
      res.json(post);
    } catch (err) {
      res.status(400).json({postNotFound: 'No Post Found'});
    }
  }
);

module.exports = router;
