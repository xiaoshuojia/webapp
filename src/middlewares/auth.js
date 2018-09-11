
// es6 code
import config from '../config.js';
import UserModel from '../models/user.js';
import jwt from 'jwt-simple';

// es6 code
export const authUser = (req, res, next) => {

  res.locals.currentUser = null;

  // use jwt token
  const token = req.headers['x-access-token'] || req.signedCookies[config.cookieName] || '';

  if (token) {
    try{

      const decoded = jwt.decode(token, config.jwtSecret);

      if (decoded.exp <= Date.now()){
        res.end('Access token has expired', 400);
        return;
      }
      req.user = res.locals.currentUser = decoded;
      return next();
    }
    catch(err){
      return next();
    }
  }
  else {
    next();
  }

};

//es6 code

export const userRequired = (req, res, next) => {
  if (!req.user){
    let err = new Error('需要登录');
    err.status = 403;
    next(err);
    return;
  }
};
// function adminRequired(req, res, next){
export const adminRequired = (req, res, next) => {
  console.log('req.user： ' + req.user);
  // if (!req.session || !req.session.user){
  if (!req.user){
    let err = new Error('需要登录');    // let是做什么？
    err.status = 403;                 // 403?
    next(err);
    return;
  }
  if (!req.user.isAdmin){
    let err = new Error('需要管理员权限');
    err.status = 403;
    next(err);
    return;
  }
  next();
};
