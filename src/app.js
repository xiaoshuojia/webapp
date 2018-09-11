require('./models/init');

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import expressLayouts from 'express-ejs-layouts';

import api from './route.api.js';
import page from './route.page.js';
import config from './config';
import * as auth from './middlewares/auth.js';


// es6 code

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



app.use(auth.authUser);
app.use('/', page)
.use('/api/v1', api); //use the version

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
