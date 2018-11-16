var express = require('express');
var router = express.Router();
var Student = require('../controllers/studentController');
var Company = require('../controllers/companyController');
//const path = require('path');

/* GET home page. */
router.get('/', function(req, res,next) {
  res.send('Hello');
});


module.exports = router;
