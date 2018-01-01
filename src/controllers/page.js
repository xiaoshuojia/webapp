import PostModel from '../models/post.js'
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
export const index = (req, res, next) => {
  console.log('new index page handle');
  res.render('index', { title: 'My first web app' });
}

export const posts = (req, res, next) => {
  console.log('new posts page handle');
  res.render('posts', {title: 'Hello posts'});
}

export const create = (req, res, next) => {
  console.log("new create artile page handle");
  res.render('create', {title: 'create'});
}

export const show = (req, res, next) => {
  console.log("new show one post detail handle");
  const id = req.query.id;
  // 这里的function第一个参数是错误，第二个就是我们查询得到的结果。
  // PostModel.findOne({_id: id}, function(err, article){
  //   res.render('show', {article});
  // });
  // 测试箭头函数
  PostModel.findOne({_id: id}, (err, article) => {
    // markdown 使用
    // article.content = marked(article.content);

    if (err){
      next(err);
      return;
    }
    // 使用markdown-it渲染
    article.content = md.render(article.content);
    res.render('show', {article});
  });
}
