import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import config from '../config.js';
import moment from 'moment';
import {sendActiveMail} from '../common/mail.js';
import utility from 'utility';

export const signup = (req, res, next) => {
  const {name, email, pass, rePass} = req.body;

  if (pass !== rePass){
    return errorHandle(new Error("两次密码不一致"), next);
  }

  const user = new UserModel(); // const 这里能行吗，因为const我理解就是它代表的变量不能修改，那么后面的赋值是怎么回事，算是修改变量吗
  // 实际const在js中，如果是对象，那么其实管不了对象的属性，就是说对象的属性仍然可以改变。

  user.name = name ;
  user.email = email;
  user.pass = bcrypt.hashSync(pass, 10);  // 网络上传递的是明文啊，会不会有影响
  console.log('user:' + user);
  user.save(function(err){
    if (err){
      next(err);
    }
    else {
      // 通过邮箱激活账户
      sendActiveMail(
        email,
        utility.md5(user.email + user.pass),
        name
      );

      res.json({
        message: `欢迎加入${config.name}！我们已经给您的注册邮箱发送一封邮件，请点击这里激活。`
      });
      console.log('Save the email into mongodb');
    }
  });
}

export const signin = (req, res, next ) => {
  const {name, pass} = req.body;

  UserModel.findOne({name}, function(err, user){
    console.log('**********************************************************');
    if (err || !user){
      return next(new Error('找不到用户'));

    }
    else {
      var isOk = bcrypt.compareSync(pass, user.pass);
      if (!isOk){
        return next(new Error('密码不对'));
      }

      // const authToken = user._id;
      // create the jwt token
      const jwttoken = jwt.encode(
        {
        _id:  user._id,
        name: user.name,
        isAdmin: user.name === config.admin ? true : false,
        exp: moment().add(30, 'days').valueOf()
      },
      config.jwtSecret
      );
      // console.log('exp', moment().add(30, 'days').valueOf());
      // console.log('jwtSecret: ' + jwttoken);
      const token = jwt.decode(jwttoken, config.jwtSecret);
      // console.log('token.exp: ' + token.exp);
      const opts = {
        path: '/',
        // maxAge: 1000 * 60 * 60 * 24 * 30, //cookie 有效期30天
        // maxAge: -1,     // 只有浏览器打开的这段时间有效，关闭之后无效
        // maxAge: 1000 * 60 * 60 * 24 * 30, // 使用1分钟的有效时长
        maxAge: moment().add('day', 30).valueOf(),
        signed: true,
        httpOnly: true

      };
      req.user = res.locals.currentUser = user;
      res.cookie(config.cookieName, jwttoken, opts);
      // res.end();
      res.json({ jwttoken });
    }
  });
}