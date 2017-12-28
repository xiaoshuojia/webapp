'use strict';

// create a new table for saving the article
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId; // 这个ObjectId是个什么

var PostSchema = new Schema({
  title: String,
  content: String,
  authorId: ObjectId // 作者ID
});

var PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
//# sourceMappingURL=post.js.map