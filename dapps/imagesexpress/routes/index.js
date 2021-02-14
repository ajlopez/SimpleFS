var express = require('express');
var router = express.Router();

const imagesdata = require('../lib/imagesdata');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RSK Images', imagesdata: imagesdata });
});

module.exports = router;
