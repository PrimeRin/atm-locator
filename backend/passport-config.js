const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const db = require("./database.js");

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Passport configuration
const passportConfig = (passport) => {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.query('SELECT * FROM Users WHERE user_name =?', [username], function(err, results) {
        if (err) { return done(err); }
        if (!results.length) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const user = results[0];
        bcrypt.compare(password, user.password, function(err, res) {
          if (err) { return done(err); }
          if (!res) { // Changed 'res === false' to 'res' to correctly check the result of bcrypt.compare
            return done(null, false, { message: 'Incorrect password.' });
          } else {
            return done(null, user);
          }
        });
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    console.log('Serializing user:', user);
    done(null, user.user_id);
  });

  passport.deserializeUser(function(id, done) {
    db.query('SELECT * FROM Users WHERE user_id =?', [id], function(err, results) {
      if (err) {
        return done(err, null);
      }
      console.log('Deserializing user:', results[0]);
      done(null, results[0]);
    });
  });
};

module.exports = passportConfig;