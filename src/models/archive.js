// create a new table for saving the article

//es6 code
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var ArchiveSchema = new Schema({
  time: Number
});

var ArchiveModel = mongoose.model('Archive', ArchiveSchema);

export default ArchiveModel;
