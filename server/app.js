var express = require('express');
var app = express();

var expressWinston = require('winston-express-middleware');

var validator = require('express-validator');


//importing some usefule libraries
//var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors'); 
var winston = require('winston');
 
  winston.log('info', 'Hello distributed log files!');
  winston.info('Hello again distributed logs');
 
  winston.level = 'debug';
  winston.log('debug', 'Now my debug messages are written to console!');

//Then we require() modules from our routes directory. 
//These modules/files contain code for handling particular sets of related "routes" (URL paths).
var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');  //Import routes for "catalog" area of site

// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'client/app')));
app.use(express.static(path.join(__dirname, 'client/app/add_s')));
app.use(express.static(path.join(__dirname, 'client/app/edit_s')));
app.use(express.static(path.join(__dirname, 'client/app/navbar')));
app.use(express.static(path.join(__dirname, 'client/app/studenthome')));
app.use(express.static(path.join(__dirname, 'client/app/show_s')));
app.use(express.static(path.join(__dirname, 'client/bower-components')));



//The next set of functions call app.use() to add the middleware libraries into the request handling chain.
// In addition to the 3rd party libraries we imported previously, 
//we use the express.static middleware to get Express to serve all the static files in the /public directory in the project root.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static('client'));
  app.use(validator());
  app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));

app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ],
      meta: true, 
      msg: "HTTP {{req.method}} {{req.url}}", 
      expressFormat: true, 
      colorStatus: true, 
      ignoreRoute: function (req, res) { return false; }
    }));

//Error handling for error 404 

//Now that all the other middleware is set up, we add our (previously imported) route-handling
// code to the request handling chain. 
//The imported code will define particular routes for the different parts of the site:

app.use('/', index);
app.use('/users', users);
app.use('/api', home);
app.get('*', function(req, res){
  res.send('Sorry,The requested URL cannot be found', 404);
});

app.use(express.static(__dirname+"/client/dist"));

// catch 404 and forward to error handler

 app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/placement';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var port = 3000;
//The Express application object (app) is now fully configured.
// The last step is to add it to the module exports (this is what allows it to be imported by /bin/www).
module.exports = app;
app.listen(port,function(){
winston.log("Running on port " + port)});

