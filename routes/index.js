var express = require("express");
var router = express.Router();
const passport = require("passport");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index.html");
});
// PROFILE
router.get("/profile", function (req, res, next) {
  res.render("profile.html", { profile:  req.user._json});
});
// Login
router.get("/login", function (req, res, next) {
  res.render("login.html");
});
// FB Login
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] }) // Xin quyền cấp email từ fbscope , Scope:
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);
// Google login
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

module.exports = router;
