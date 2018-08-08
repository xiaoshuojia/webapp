import PostModel from '../models/post.js';
import UserModel from '../models/user.js';
import CategoryModel from '../models/category.js';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import config from '../config.js';
import moment from 'moment';

export const create = (req, res, next) => {
  // es6 code
  const {title, content, categoryId} = req.body;
  console.log(`Create post, title: ${title}, content: ${content}, categoryId: ${categoryId}`);
  if (title === '' || content === '')
  {
    console.log('标题或者内容不同为空');
    // return next('标题或者内容不同为空');
    // 返回一个错误提示
    res.send({success: false, err: '标题或者内容不同为空'});
  }
  // save the title and content
  const post = new PostModel();
  post.title = title;
  post.content = content;
  post.authorId = res.locals.currentUser._id;
  post.categoryId = categoryId;
  post.modifyDate = post.createDate = Date.now();
  console.log(`post.createData: ${post.createDate}, post.modifyDate: ${post.modifyDate}`);
  post.save((err, doc) => {
    if (err){
      next(err);
      return;
    }
    res.json({post: doc});  // 返回新建的文章数据
  });
}

export const more = (req, res, next) => {
  // Get posts from MongoDb
  console.log('new handle get posts');
  PostModel.find({}, {}, (err, posts) => {
    if (err){
      next(err);
      return;
    }
    else {
      res.json({success: true, PostsList: posts});
    }
  });
}

export const one = (req, res, next) => {
  console.log('new get one post');
  const id = req.params.id;
  PostModel.findOne({_id: id}, (err, post) => {
    if (err){
      next(err);
      return;
    };
    res.json({success: true, post});
  });
}

export const edit = (req, res, next) => {
  console.log('new handle edit ');
  const {id, title, content} = req.body;
  var modifyDate = Date.now();
  PostModel.findOneAndUpdate({_id: id}, {title: title, content: content, modifyDate: modifyDate}, (err) => {
    if (err){
      next(err);
      return ;
    }
    res.json({success: true});
  });
}
