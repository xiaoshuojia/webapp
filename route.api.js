var express = require('express');
var router = express.Router();

/* GET posts list . */
router.get('/posts/list', function(req, res, next) {
  // res.send({title: 'posts'});
  // res.render('posts', {title: 'posts'});
  // 返回一个HTML页面，给一个对象，包括title和postslist
  // res.render('posts', {title: "posts", PostsList: ['文章1', '文章2', '文章3']});
  // 返回JSON对象 然后浏览器渲染
  res.json({PostsList: ['文章1', '文章2', '文章3']});
});

router.post('/posts/create', function(req, res, next){
  console.log("post create information");
  console.log('title:' + req.body.title);
  console.log('content: ' + req.body.content);
  res.json({success: true});
})

module.exports = router;
