require('./models/init');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var index = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var api = require('./route.api');
var page = require('./route.page');
var expressLayouts = require('express-ejs-layouts');
var config = require('./config');
var auth = require('./middlewares/auth');
var connectMongodb = require('connect-mongo');
var session = require('express-session');

var mongoStore = new connectMongodb(session);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.cookieName)); // 解析cookie
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', index);
// app.use('/users', users);
// app.use('/posts', posts);
// 路由归类
// 使用session
app.use(
  session({
    secret: config.sessionSecret,
    store:  new mongoStore({url: config.mongodbUrl}),
    resave: true,
    saveUninitialized: true
  })
);
app.use(auth.authUser);
app.use('/', page)
.use('/api/v1', api); // use the version

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  // better error handle
  res.format({
    json(){
      res.send({error: err.toString()});
    },
    html(){
      res.render('error');
    },
    default(){
      const message = `${errorDetails}`;
      console.log('message: ' + message);
      console.log('error: ' + err.toString());
      res.send(`500 internal server error\n${err.toString()}`);
    }
  });

});


var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3000);

module.exports = app;
