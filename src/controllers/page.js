import PostModel from '../models/post.js';
import ArchiveModel from '../models/archive';
import * as TimeFormat from '../util/timeformat';
import MarkdownIt from 'markdown-it';
import config from '../config.js';

const md = new MarkdownIt();
export const index = (req, res, next) => {
  console.log('new index page handle');
  res.render('index', { title: 'My first web app' });
};

export const posts = (req, res, next) => {
  console.log('new posts page handle');
  res.render('posts', {title: 'Hello posts'});
};

export const create = (req, res, next) => {
  console.log('new create artile page handle');
  res.render('create', {title: 'create'});
};

export const show = (req, res, next) => {
  console.log('new show one post detail handle');
  const id = req.query.id;
  console.log(`id: ${id}`);
  PostModel.findOne({_id: id}, (err, article) => {
    // markdown 使用
    // article.content = marked(article.content);

    if (err){
      next(err);
      return;
    }
    console.log(`to object: ${article.toObject()}`);
    console.log(`article.tile: ${article.title}, artitle.content: ${article.content}, article.createDate: ${article.createDate}`);
    // 使用markdown-it渲染
    article.content = md.render(article.content);
    res.render('show', {article});
  });
};

export const edit = (req, res, next ) => {

    const id = req.query.id;

    res.render('edit', { id });
};

export const signup = (req, res, next) => {
  res.render('signup');
};


export const signin = (req, res, next) => {
    res.render('signin');
};


export const signout = (req, res, next) => {
  req.user = null;
  res.clearCookie(config.cookieName, {path: '/'});
  console.log('Clear the cookie: ' + config.cookieName);
  res.redirect('/');
};

export const categories = (req, res, next) => {

  res.render('categories');
};

export  const categoryshow = (req, res, next) => {
  const { id } = req.query;
  PostModel.find({categoryId: id}, (err, postsList) => {
    if (err){
      next(err);
      return;
    }
    for (var i = 0; i < postsList.length; i++) {
      console.log(`postsList[${i}].title: ${postsList[i].title}`);
    }

    res.render('categoryshow', {postsList});
  });
};

export const archives = (req, res, next) => {
  res.render('archives');
};

export  const archiveshow = (req, res, next) => {
  const { id } = req.query;
  console.log(`archive id: ${id}`);
  ArchiveModel.findOne({_id: id}, (err, doc) => {
    if (err) {
      return next(err);
    }
    
    var testT1 = TimeFormat.getCurrentAchiveTime();
    var date = new Date(doc.time);
    var currentAchiveTime = doc.time;
    var nextArchiveTime = TimeFormat.getNextArchiveTime(currentAchiveTime);
    var nextDate = new Date(nextArchiveTime);
    // find the posts
    PostModel.find({createDate: {$gte: currentAchiveTime, $lt: nextArchiveTime, $exists: true}}, (err, posts) => {
      if(err) {
        return next(err);
      }
      res.render('archiveshow', {postsList: posts});
    });
  });
};
