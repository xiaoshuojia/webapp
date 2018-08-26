import ArchiveModel from '../models/archive.js';

export const more = (req, res, next) => {
  console.log(`archive more`);
  var ArchivesList = [];
  ArchiveModel.find({}, function(err, doc) {
    if (err) {
      return next(err);
    }
    res.json({sucess: true, ArchivesList: doc});
  })
};
