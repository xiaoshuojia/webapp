import PostModel from '../models/post.js';
import UserModel from '../models/user.js';
import CategoryModel from '../models/category.js';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import config from '../config.js';
import moment from 'moment';

export const more = (req, res, next) => {
  console.log('Get posts categories.');
  CategoryModel.find({}, {}, (err, categories) => {
    if (err){
      next(err);
      return;
    }
    else {
      categories.forEach(function(element) {
        console.log(`element.name: ${element.name}, element.date: ${new Date(element.date)}`);
      });
      res.json({success: true, CategoriesList: categories});
    }
  });
};

export const create = (req, res, next) => {
  const {name} = req.body;

  if (name === '')
  {
    console.log('内容不能为空');
    // return next('标题或者内容不同为空');
    // 返回一个错误提示
    return res.send({success: false, err: '内容不能为空'});
  }
  // save the title and content
  const category = new CategoryModel();
  category.name = name;
  category.date = Date.now();
  console.log(`date: ${category.data}`);
  category.save((err, doc) => {
    if (err){
      next(err);
      return;
    }
    res.json({category: doc});  // 返回新建的分类
  });
};

export const modify = (req, res, next) => {
  const { id } = req.params;
  const { category } = req.body;

  console.log(`modify the category, id: ${id}, category: ${category}`);
  if (category === '' || category === undefined)
  {
    console.log('请输入分类');
    return res.json({success: false, err: '请输入分类'});
  }

  CategoryModel.findOneAndUpdate({_id: id}, {name: category}, function(err){
    if (err) {
      return next('update failed');
    }
  });
  res.json({success: true});
};


export const deletecategory = (req, res, next) => {

  const {id } = req.params;
  console.log(`delete the catagory ${id}`);
  CategoryModel.remove({_id: id}, function(err){
      if(err) {
          return next(new Error('删除数据出错'));
      }
      // success
      res.json({success: true});
  });
};
