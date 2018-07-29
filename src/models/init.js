// connect the DB

// es6 code
import mongoose from 'mongoose';
import config from '../config.js';

const mongo = mongoose.connect(config.mongodbUrl, {
  useMongoClient: true
});

mongo
.then(db => {
  console.log('MongoDB has been connected !');
})
.catch(err => {
  console.log('connecting error ');
  throw(err);
});
