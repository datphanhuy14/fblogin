const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const config = require('./configs/config');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


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
  
  passport.use(new GoogleStrategy({
    clientID: config.gClientID,
    clientSecret: config.gClientSecret,
    callbackURL: config.gCallbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
     // console.log(profile);
     return cb(null, profile);
  }
  ));
  
  
  // PASSPORT & session 
  
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(user, cb) {
    cb(null, user);
  });
  