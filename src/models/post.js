// create a new table for saving the article

//es6 code
import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;   // 这个ObjectId是个什么

var PostSchema = new Schema({
  title: String,
  content: String,
  authorId: ObjectId  // 作者ID
});

var PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
