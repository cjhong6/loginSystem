var express = require('express');
var router = express.Router();
var db = require('../database/queries')
const passport = require('passport');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register',{ title: 'Register' });
});

router.get('/login', function(req, res, next) {
  res.render('login',{ title: 'Login' });
});

router.post('/register', db.createUser);

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'login',
        failureFlash: true})
    );

router.get('/logout', function (req, res) {
      req.logout();
      req.flash('success_msg', 'You have logged out');
      res.redirect('login');
});

module.exports = router;
