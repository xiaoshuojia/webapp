// var express = require('express');
// var router = express.Router();
// var PostModel = require('./models/post');
// var bcrypt = require('bcrypt');
// var UserModel = require('./models/user');
// var config = require('./config');
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import moment from 'moment';
import PostModel from './models/post.js';
import UserModel from './models/user.js';
import config from './config.js';
import * as post from './controllers/post.js';
import * as user from './controllers/user.js';
import * as auth from './middlewares/auth.js';

const router = express.Router();

/* GET posts list . */
router.get('/posts/list', function(req, res, next) {
  // res.send({title: 'posts'});
  // res.render('posts', {title: 'posts'});
  // 返回一个HTML页面，给一个对象，包括title和postslist
  // res.render('posts', {title: "posts", PostsList: ['文章1', '文章2', '文章3']});
  // 返回JSON对象 然后浏览器渲染
  res.json({PostsList: ['文章1', '文章2', '文章3']});
});

router.post('/posts', auth.adminRequired, post.create);

// get posts
router.get('/posts', post.more);

// get on specific article
router.get('/posts/:id', post.one);

// post edit ariticle
router.patch('/posts',post.edit);


// POST signup user
router.post('/signup', user.signup);


// POST signin user
router.post('/signin', user.signin);



// module.exports = router;
export default router;
