var config = require('../config');
var UserModel = require('../models/user');

function authUser(req, res, next){

  req.
  res.locals.currentUser = null;

  if(req.session && req.session.user){
    const user = req.session.user;
    console.log('req.session: ' + req.session);
    res.locals.currentUser = user;
    next();
  }else {
    const authToken = req.signedCookies[config.cookieName] || '';
    console.log('authToken: ' + authToken);
    if (authToken){
      UserModel.findOne({ _id: authToken }, function(err, user){
        if (err || !user){ //没有用户 或出错

          next();   // 为何这里不next(err)，我觉得可能是游客也能登录
        }
        else{
          if(user.loginname === config.admin){  // 管理员
            console.log('user.loginname: ' + user.loginname);
            console.log('config.admin: ' + config.admin);
            user.isAdmin = true;
          }
          req.session.user = user;  // 为什么给req？为了保存信息，用来判断是不是已有的用户
          console.log('user: '+ user);
          res.locals.currentUser = user;
          console.log('res.logcals.currentUser:' + res.locals.currentUser);
          next();
        }

      });
    }
    else {
      next();
    }
  }

}

function adminRequired(req, res, next){
  if (!req.session || !req.session.user){
    let err = new Error('需要登录');    // let是做什么？
    err.status = 403;                 // 403?
    next(err);
    return;
  }
  if (!req.session.user.isAdmin){
    console.log('req.session.user: ' + req.session.user);
    let err = new Error('需要管理员权限');
    err.status = 403;
    next(err);
    return;
  }
  next();
}

module.exports = { authUser, adminRequired };
