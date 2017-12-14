var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');

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
  var title = req.body.title;
  var content = req.body.content;

  if (title === '' || content === '')
  {
    console.log('标题或者内容不同为空');
    // return next('标题或者内容不同为空');
    // 返回一个错误提示
    res.send({success: false, err: '标题或者内容不同为空'});
  }
  // save the title and content
  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.save(function(err, doc){
    res.json({success: true});
  });
});

// get posts
router.get('/posts', function(req, res, next){
  // Get posts from MongoDb
  console.log('Get posts from MongoDb');
  PostModel.find({}, {}, function(err, posts){
    if (err){
      res.json({success: false});
      return;
    }
    else {
      res.json({success: true, PostsList: posts});
    }
  });
});

// get on specific article
router.get('/posts/one', function(req, res, next){
  var id = req.query.id;

  PostModel.findOne({_id: id}, function(err, post){
    if (err){
      res.json({success: false});
      return;
    };
    res.json({success: true, post});
  });
});

// post edit ariticle
router.post('/posts/edit', function(req, res, next){
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({_id: id}, {title, content}, function(err){
    if (err){
      res.json({success: false});
      return ;
    }
    res.json({success: true});
  });
});

module.exports = router;
