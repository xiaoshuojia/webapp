'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  pass: String
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
//# sourceMappingURL=user.js.map