var config = require('../config');
var UserModel = require('../models/user');

function authUser(req, res, next){

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
          // 通过mongodb查找到的user对象，不能直接往里面动态的插入属性
          // 比如：user.a = 1; 无效
          // 一定要先下面一下。明白了吗？
          //  我的教程也有点问题，我要改一下
          //  哦啦
          user = user.toObject();
          console.log('user.name: ' + user.name);
          if(user.name === config.admin){  // 管理员
            user.isAdmin = true;
          }
          req.session.user = user;  // 为什么给req？为了保存信息，用来判断是不是已有的用户
          console.log('req.session.user.isAdmin: ' + req.session.user.isAdmin);
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
  // console.log('adminRequired: req.session.user.name: ' + req.session.user.name);
  // console.log('adminRequired: req.session.user.isAdmin: ' + req.session.user.isAdmin);
  if (!req.session || !req.session.user){
    // console.log('req.session.user.name: ' + req.session.user.name);
    // console.log('req.session.user.isAdmin: ' + req.session.user.isAdmin);
    let err = new Error('需要登录');    // let是做什么？
    err.status = 403;                 // 403?
    next(err);
    return;
  }
  if (!req.session.user.isAdmin){
    console.log('req.session.user.name: ' + req.session.user.name);
    console.log('req.session.user.isAdmin: ' + req.session.user.isAdmin);
    let err = new Error('需要管理员权限');
    err.status = 403;
    next(err);
    return;
  }
  next();
}

module.exports = { authUser, adminRequired };
