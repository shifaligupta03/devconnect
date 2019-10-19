const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');
const getUser =  require('../../middleware/getUser');

router.get('/test', (req, res) => res.json({msg: 'posts'}));
router.get('/', getUser ,async (req, res) => {
  try {
    let connections = await Post.findById(req.user);
    let posts=[];
    if(connections){
      console.log('show connection posts');
    }
    //  posts = await Post.find().sort({date: -1});
    // console.log(posts);
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
  async (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    let post = await newPost.save();
    res.json(post);
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
      if(post.user==req.user.id) {
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
        post.likes.filter(like => like.user.toString() === req.user.id).length >
        0
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
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({notLiked: 'You have not liked this post'});
      }

      let removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);
      await post.likes.splice(removeIndex, 1);
      // await post.likes.unshift({user: req.user.id});
      post = await post.save();
      res.json(post);
    } catch (err) {
      res.status(400).json({postNotFound: 'No Post Found'});
    }
  }
);

router.post(
  '/comment/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const {errors, isValid} = validatePostInput(req.body);

      if (!isValid) {
        return res.status(404).json(errors);
      }

      let post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      post = await post.save();
      res.json(post);
    } catch (err) {
      res.status(400).json({postNotFound: 'No Post Found'});
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
