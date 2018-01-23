// var mongoose = require('mongoose');
// es6 code
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  pass: String,
  active: Boolean
});

const UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;
export default UserModel;
