// connect the DB
var mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.1.3:32772/webapp', {
  useMongoClient: true
});
