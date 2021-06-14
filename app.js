var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const nunjucks = require('nunjucks');
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const config = require('./configs/config');
var disUser; 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'html');

// Sử dụng FacebookStrategy cùng Passport-Fb 
passport.use(new FacebookStrategy({
  clientID: config.clientID,          
  clientSecret: config.clientSecret,
  callbackURL: config.callbackURL,
  profileFields: ['email','gender','locale','displayName']
},
function(accessToken, refreshToken, profile, cb) { 
  // console.log(profile);
  return cb(null, profile);
}
));

// PASSPORT & session 
app.use(session({secret:'zesvn88' , saveUninitialized : true, resave : true}));
app.use(passport.initialize()); 
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});


// app.use(logger('dev'));
app.use(session({secret:'zesvn88' , saveUninitialized : true, resave : true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  next();
}); 
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err : err.message});  
});

module.exports = app;
