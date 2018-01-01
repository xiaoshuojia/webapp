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
router.post('/signup', function(req, res, next){
  // var name = req.body.name;
  // var pass = req.body.pass;
  // var rePass = req.body.rePass;
  // 使用解构，而不是逐个赋值
  const {name, pass, rePass} = req.body;

  if (pass !== rePass){
    return errorHandle(new Error("两次密码不一致"), next);
  }

  const user = new UserModel(); // const 这里能行吗，因为const我理解就是它代表的变量不能修改，那么后面的赋值是怎么回事，算是修改变量吗
  user.name = name ;
  user.pass = bcrypt.hashSync(pass, 10);  // 网络上传递的是明文啊，会不会有影响
  console.log('user:' + user);
  user.save(function(err){
    if (err){
      next(err);
    }
    else {
      res.end();
    }
  });
});

// POST signin user
router.post('/signin', function(req, res, next){
  console.log('post signin ');
  // var name = req.body.name || '';
  // var pass = req.body.pass || '';
  // es6 code
  // 这里出现一个问题，即原来可以赋值给'',现在没啦，这个怎么办
  const {name, pass} = req.body;

  UserModel.findOne({name}, function(err, user){
    console.log('**********************************************************');
    if (err || !user){
      return next(new Error('找不到用户'));

    }
    else {
      var isOk = bcrypt.compareSync(pass, user.pass);
      if (!isOk){
        return next(new Error('密码不对'));
      }

      // const authToken = user._id;
      // create the jwt token
      const jwttoken = jwt.encode(
        {
        _id:  user._id,
        name: user.name,
        isAdmin: user.name === config.admin ? true : false,
        exp: moment().add(30, 'days').valueOf()
      },
      config.jwtSecret
      );
      // console.log('exp', moment().add(30, 'days').valueOf());
      // console.log('jwtSecret: ' + jwttoken);
      const token = jwt.decode(jwttoken, config.jwtSecret);
      // console.log('token.exp: ' + token.exp);
      const opts = {
        path: '/',
        // maxAge: 1000 * 60 * 60 * 24 * 30, //cookie 有效期30天
        // maxAge: -1,     // 只有浏览器打开的这段时间有效，关闭之后无效
        // maxAge: 1000 * 60 * 60 * 24 * 30, // 使用1分钟的有效时长
        maxAge: moment().add('day', 30).valueOf(),
        signed: true,
        httpOnly: true

      };
      req.user = res.locals.currentUser = user;
      res.cookie(config.cookieName, jwttoken, opts);
      // res.end();
      res.json({ jwttoken });
    }
  });
});



// module.exports = router;
export default router;
