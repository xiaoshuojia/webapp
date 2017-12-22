var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var marked = require('marked');
var MarkdownIt = require('markdown-it');
var config = require('./config');

var md = new MarkdownIt();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Get / page");
  res.render('index', { title: 'My first web app' });
});

// GET users page
router.get('/users', function(req, res, next){
    console.log('Get /users page');
    res.send("zhangsan\n lisi\n wangerwangzi");
});

// GET posts page
router.get('/posts', function(req, res, next){
    console.log('Get posts page');
    res.render('posts', {title: 'Hello posts'});
});


// GET create page
router.get('/posts/create', function(req, res, next){
    console.log("Get create page");
    res.render('create', {title: 'create'});
});


// GET the specific ariticle content
router.get('/posts/show', function(req, res, next){
  console.log("Get /posts/show specific ariticle detail");
  var id = req.query.id;
  // 这里的function第一个参数是错误，第二个就是我们查询得到的结果。
  // PostModel.findOne({_id: id}, function(err, article){
  //   res.render('show', {article});
  // });
  // 测试箭头函数
  PostModel.findOne({_id: id}, (err, article) => {
    // markdown 使用
    // article.content = marked(article.content);

    if (err){
      next(err);
      return;
    }
    // 使用markdown-it渲染
    article.content = md.render(article.content);
    res.render('show', {article});
  });
});

// get edit page
router.get('/posts/edit', function(req, res, next){
  var id = req.query.id;

  res.render('edit', { id });

});

// GET signup page
router.get('/signup', function(req, res, next){
  res.render('signup');
});

// GET signin  page
router.get('/signin', function(req, res, next){
  console.log('page signin');
  res.render('signin');
});

// GET signout page
router.get('/signout', function(req, res, next){
  console.log('signout page ');
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

  res.clearCookie(config.cookieName, {path: '/'});
  console.log('Clear the cookie: ' + config.cookieName);
  res.redirect('/');
});


module.exports = router;
