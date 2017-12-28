'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'My first web app' });
});

module.exports = router;
//# sourceMappingURL=index.js.map