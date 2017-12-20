var config = require('../config');
var UserModel = require('../models/user');

function authUser(req, res, next){
  const authToken = req.signedCookies[config.cookieName] || '';
  console.log('authToken: ' + authToken);
  res.locals.currentUser = null;

  if (authToken){
    UserModel.findOne({ _id: authToken }, function(err, user){
      if (err){
        next();   // 为何这里不next(err)，我觉得可能是游客也能登录
      }
      else{
        res.locals.currentUser = user;
        next();
      }

    });
  }
  else {
    next();
  }
}

module.exports = { authUser };
