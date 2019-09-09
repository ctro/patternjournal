var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var patternsRouter = require('./routes/patterns');
var dayRouter = require('./routes/day');

var app = express();

// HTTP verb overrides
app.use(methodOverride('_method'))

// Authentication setup
passport.use(new Strategy(
  function(username, password, done) {
    if (username == "u" && password == "p") {
      return done(null, "MyUserId");
    }
    else{
      return done(false)
    } 

  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/patterns', patternsRouter);
app.use('/day', dayRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(res.render('404'));
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
