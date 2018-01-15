// var express = require('express');
// var router = express.Router();
// var PostModel = require('./models/post');
// var marked = require('marked');
// var MarkdownIt = require('markdown-it');
// var config = require('./config');
// var auth = require('./middlewares/auth');

// es6 code
import express from 'express';
import marked from 'marked';
import MarkdownIt from 'markdown-it';
import PostModel from './models/post.js';
import config from './config.js';
import * as auth from './middlewares/auth.js';  // 导出多个函数（对象），需要导出所有对象*，as作为一个别名auth来使用
import * as page from './controllers/page.js'

const router = express.Router();

const md = new MarkdownIt();

/* GET home page. */
router.get('/', page.index);

// GET users page
router.get('/users', auth.adminRequired, function(req, res, next){
    console.log('Get /users page');
    res.send("zhangsan\n lisi\n wangerwangzi");
});

// GET posts page
router.get('/posts', page.posts);


// GET create page
router.get('/posts/create', auth.adminRequired, page.create);


// GET the specific ariticle content
router.get('/posts/show', page.show);

// get edit page
router.get('/posts/edit',  page.edit);

// GET signup page
router.get('/signup', page.signup);

// GET signin  page
router.get('/signin', page.signin);

// GET signout page
router.get('/signout', page.signout
  // res.locals.currentUser = null;

  // var authToken = req.signedCookies[config.cookieName] || '';;
  // var opts = {
  //   path: '/',
  //   // maxAge: 1000 * 60 * 60 * 24 * 30, //cookie 有效期30天
  //   // maxAge: -1,     // 只有浏览器打开的这段时间有效，关闭之后无效
  //   maxAge: 0, // 不记录cookie
  //   signed: true,
  //   httpOnly: true
  // };
  // res.cookie(config.cookieName, authToken, opts);
  // res.render('signout');
  // req.session.user = null;  // 因为使用了jwt来确定登录情况，所以要去掉req中的session的信息
  );


// module.exports = router;
export default router;
