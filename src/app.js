require('./models/init');
// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var http = require('http');
// var index = require('./routes/index');
// var users = require('./routes/users');
// var posts = require('./routes/posts');
// var api = require('./route.api');
// var page = require('./route.page');
// var expressLayouts = require('express-ejs-layouts');
// var config = require('./config');
// var auth = require('./middlewares/auth');
// var connectMongodb = require('connect-mongo');
// var session = require('express-session');

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import expressLayouts from 'express-ejs-layouts';
// import connectMongodb from 'connect-mongo';
// import session from 'express-session';
import api from './route.api.js';
import page from './route.page.js';
import config from './config';
import * as auth from './middlewares/auth.js';

// var mongoStore = new connectMongodb(session);
// var app = express();

// es6 code
// const mongoStore = new connectMongodb(session);
const app = express();

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
// app.use(
//   session({
//     secret: config.sessionSecret,
//     store:  new mongoStore({url: config.mongodbUrl}),
//     resave: true,
//     saveUninitialized: true
//   })
// );
// 使用了JWT所以不用session了

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


// var server = http.createServer(app);
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3000);

// module.exports = app;
export default app;
