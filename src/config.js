// module.exports = {
//   cookieName: 'your_cookie_name',
//   mongodbUrl: 'mongodb://localhost:32772/webapp',
//   admin: 'xujie',
//   sessionSecret: 'your_session_secret'
// }


// es6 code
// 导出一个对象，直接export default
export default {
  cookieName: 'your_cookie_name',
  jwtSecret: 'your_jwt_secret',
  mongodbUrl: 'mongodb://localhost:27017/webapp',
  admin: 'admin',
  sessionSecret: 'your_session_secret',
  email: {
    host: 'smtp.qq.com',
    port: 465,
    auth: {
      user: 'xx@qq.com',
      pass: 'your_password'
    }
  },
  name: '我的社区',
  url: 'localhost:' + '3000'
}
