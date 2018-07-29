
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
