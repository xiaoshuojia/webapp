var express = require('express');
var router = express.Router();

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

module.exports = router;
