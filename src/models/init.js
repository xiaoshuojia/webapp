// connect the DB

// var mongoose = require('mongoose');
// var config = require('../config');

// es6 code
import mongoose from 'mongoose';
import config from '../config.js';

mongoose.connect(config.mongodbUrl, {
  useMongoClient: true
});
