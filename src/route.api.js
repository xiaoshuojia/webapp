
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import moment from 'moment';
import PostModel from './models/post.js';
import UserModel from './models/user.js';
import config from './config.js';
import * as post from './controllers/post.js';
import * as user from './controllers/user.js';
import * as category from './controllers/category.js';
import * as auth from './middlewares/auth.js';
import * as archive from './controllers/archive.js';

const router = express.Router();

/* GET posts list . */
router.get('/posts/list', function(req, res, next) {
  res.json({PostsList: ['文章1', '文章2', '文章3']});
});

router.post('/posts', auth.adminRequired, post.create);

// get posts
router.get('/posts', post.more);

// get posts about pagecount
router.get('/posts/pagecount/:id', post.moreatpage);

// get on specific article
router.get('/posts/:id', post.one);

// post edit ariticle
router.patch('/posts',post.edit);

// delete the ariticle
router.delete('/posts/:id', post.remove);

// get posts categories
router.get('/categories', category.more);

// POST signup user
router.post('/signup', user.signup);


// POST signin user
router.post('/signin', user.signin);


// post category
router.post('/categories', category.create);

// modify the category
router.patch('/categories/:id', category.modify);


// delete the category
router.delete('/categories/:id', category.deletecategory);

// get archive
router.get('/archives', archive.more);
// module.exports = router;
export default router;
