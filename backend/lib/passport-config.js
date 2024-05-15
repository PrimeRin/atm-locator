const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require("./database.js");

// Passport configuration
const passportConfig = (passport) => {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.query('SELECT * FROM Users WHERE username = ?', [username], function(err, results) {
        if (err) { return done(err); }
        if (!results.length) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const user = results[0];
        bcrypt.compare(password, user.password, function(err, res) {
          if (err) { return done(err); }
          if (!res) { 
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
    done(null, user.id); // Serialize the user ID
  });

  passport.deserializeUser(function(id, done) {
    db.query('SELECT * FROM Users WHERE id = ?', [id], function(err, results) {
      if (err) {
        return done(err, null);
      }
      console.log('Deserializing user:', results[0]);
      done(null, results[0]);
    });
  });
};

module.exports = passportConfig;
