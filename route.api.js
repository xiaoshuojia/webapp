var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var bcrypt = require('bcrypt');
var UserModel = require('./models/user');
var config = require('./config');

/* GET posts list . */
router.get('/posts/list', function(req, res, next) {
  // res.send({title: 'posts'});
  // res.render('posts', {title: 'posts'});
  // 返回一个HTML页面，给一个对象，包括title和postslist
  // res.render('posts', {title: "posts", PostsList: ['文章1', '文章2', '文章3']});
  // 返回JSON对象 然后浏览器渲染
  res.json({PostsList: ['文章1', '文章2', '文章3']});
});

router.post('/posts', function(req, res, next){
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
  post.authorId = res.locals.currentUser._id;
  post.save(function(err, doc){
    if (err){
      next(err);
      return;
    }
    res.json({post: doc});  // 返回新建的文章数据
  });
});

// get posts
router.get('/posts', function(req, res, next){
  // Get posts from MongoDb
  console.log('Get posts from MongoDb');
  PostModel.find({}, {}, function(err, posts){
    console.log('find the posts');
    if (err){
      // res.json({success: false});
      console.log('get posts page error ');
      next(err);
      return;
    }
    else {
      console.log('posts:' + posts);
      res.json({success: true, PostsList: posts});
    }
  });
});

// get on specific article
router.get('/posts/:id', function(req, res, next){
  // var id = req.query.id;
  var id = req.params.id;
  console.log('post/:id = ', id);
  PostModel.findOne({_id: id}, function(err, post){
    if (err){
      console.log('can not find the article');
      // res.json({success: false});
      next(err);
      return;
    };
    console.log('find the article');
    res.json({success: true, post});
  });
});

// post edit ariticle
router.patch('/posts', function(req, res, next){
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({_id: id}, {title, content}, function(err){
    if (err){
      // res.json({success: false});
      next(err);
      return ;
    }
    res.json({success: true});
  });
});


// POST signup user
router.post('/signup', function(req, res, next){
  var name = req.body.name;
  var pass = req.body.pass;
  var rePass = req.body.rePass;

  if (pass !== rePass){
    return errorHandle(new Error("两次密码不一致"), next);
  }

  var user = new UserModel();
  user.name = name ;
  user.pass = bcrypt.hashSync(pass, 10);  // 网络上传递的是明文啊，会不会有影响
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
  var name = req.body.name || '';
  var pass = req.body.pass || '';

  UserModel.findOne({name}, function(err, user){
    if (err || !user){
      return next(new Error('找不到用户'));

    }
    else {
      var isOk = bcrypt.compareSync(pass, user.pass);
      if (!isOk){
        return next(new Error('密码不对'));
      }

      var authToken = user._id;
      var opts = {
        path: '/',
        // maxAge: 1000 * 60 * 60 * 24 * 30, //cookie 有效期30天
        // maxAge: -1,     // 只有浏览器打开的这段时间有效，关闭之后无效
        maxAge: 1000 * 60 * 60 * 24 * 30, // 使用1分钟的有效时长
        signed: true,
        httpOnly: true

      };

      res.cookie(config.cookieName, authToken, opts);
      res.end();
    }
  });
});



module.exports = router;
