// create a new table for saving the article

//es6 code
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  date: Number,
});

var CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;
