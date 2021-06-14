var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', );
});
// PROFILE 
router.get('/profile', function(req, res, next) {
  res.render('profile.html') 
})
// Login
router.get('/login', function(req, res, next) {
  res.render('login.html')
}) 
//
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {successRedirect: '/profile', failureRedirect: '/login' }),
  );
module.exports = router;
