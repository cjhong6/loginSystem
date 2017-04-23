var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureLogin,function(req, res, next) {
  res.render('index', { title: 'Welcome', username: req.user.username });
});

function ensureLogin(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    req.flash('error_msg', 'Please login');
    res.redirect('/users/login')
  }
}

module.exports = router;
