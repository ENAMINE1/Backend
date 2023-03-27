var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var bookRouter = require('./routes/books');
var homeRouter = require('./routes/home');

var app = express();

// connect to mongodb
//{ useNewUrlParser: true, useUnifiedTopology: true }
// mongoose.connect('mongodb://localhost/books');
mongoose.connect('mongodb+srv://root:root@cluster0.7urpojz.mongodb.net/bookstore?authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/home', homeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(442).send({ error: err.message });
  console.log(err.message);
});

module.exports = app;
