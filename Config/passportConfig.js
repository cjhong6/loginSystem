var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const {db} = require('../Config/dbConfig');
var bcrypt = require('bcryptjs');
var user = null;

passport.serializeUser(function (user, done) {//保存user对象
    console.log("Serizalized User " + user);
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    console.log("Derizalized User " + user);
    done(null, user);//可以通过数据库方式操作
});

function initPassport() {
  passport.use(new LocalStrategy(
      function (username, password, done) {
        db.oneOrNone('SELECT * FROM users WHERE username = $1', username)
          .then( data => {
            user = data;
            console.log(user);
            if(user === null){
              return done(null, false, { message: 'Incorrect username.' });
            }
            bcrypt.compare(password, user.password, function(err, res) {
                if(res === true){
                  console.log("Password Match")
                  return done(null, user);
                }
                else{
                  console.log("Password Not Match")
                  return done(null, false, { message: 'Incorrect password.' })
                }
            });
          })
          .catch(error => {
            next(error);
          })
      }
  ));
}
module.exports = {initPassport};
