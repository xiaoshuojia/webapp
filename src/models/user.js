// var mongoose = require('mongoose');
// es6 code
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  pass: String
});

const UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;
export default UserModel;
