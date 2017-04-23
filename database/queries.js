var bcrypt = require('bcryptjs');
const {db} = require('../Config/dbConfig');

function createUser(req,res,next){
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password is not match').equals(req.body.password);
  req.sanitize('username').escape();
  req.sanitize('username').trim();
  req.sanitize('email').escape();
  req.sanitize('email').trim();
  req.sanitize('password').escape();
  req.sanitize('password').trim();
  req.sanitize('password2').escape();
  req.sanitize('password2').trim();

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      req.body.password = hash;
    });
});

  var errors = req.validationErrors();
  if(errors){
    //validation error
    res.render('register', {title: "Register", errors: errors});
  }
  else{
    db.one('SELECT * FROM users WHERE username=$1', req.body.username)
      .then(() => {
        //dulpicated username
        res.render('register',{title: "Register", userExistMessage: 'Username exist already'})
      })
      .catch(() => {
        //save to db
        db.one('INSERT INTO users(username, password, email)' +
            'VALUES(${username}, ${password}, ${email}) RETURNING username', req.body)
          .then(user => {
            console.log("New User: " + user.username);
          })
          .catch(error => {
            console.log('ERROR:', error);
          });
        req.flash("success_msg", "Sign Up Success");
        res.redirect('login');
      })
  }
}

module.exports = {
//   getAllUsers: getAllUsers,
  createUser: createUser,
//   updateUser: updateUser,
//   removeUser: removeUser
};
