// create a new table for saving the article
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  content: String
});

var PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
