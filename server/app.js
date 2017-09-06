var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');

var app = express();


require('dotenv').config()


mongoose.connect('mongodb://tamastro:a56547669@tamastro-cluster-shard-00-00-qypdq.mongodb.net:27017,tamastro-cluster-shard-00-01-qypdq.mongodb.net:27017,tamastro-cluster-shard-00-02-qypdq.mongodb.net:27017/overflow?ssl=true&replicaSet=Tamastro-Cluster-shard-0&authSource=admin')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
mongoose.connect('')

// uncomment after placing your favicon in /public
//app.use(favicon(pablogth.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', index);
app.use('/users', users);
app.use('/question', questions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

module.exports = app;
