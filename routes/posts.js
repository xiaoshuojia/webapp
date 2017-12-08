var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send({title: 'posts'});
  // res.render('posts', {title: 'posts'});
  // 返回一个HTML页面，给一个对象，包括title和postslist
  res.render('posts', {title: "posts", PostsList: ['文章1', '文章2', '文章3']});
});

module.exports = router;
