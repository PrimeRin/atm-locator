require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./lib/router");
const db = require("./lib/database");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new session.MemoryStore(),
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log(`4 - Serialize user: ${JSON.stringify(user.id)}`);
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`Deserializing user: ${id}`);
  db.query('SELECT * FROM Users WHERE id =?', [id], function(err, results) {
    if (err) {
      return done(err, null);
    }
    console.log('Deserializing user:', results[0]);
    done(null, results[0]);
  });
});

passport.use(
  "local",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      console.log(`2️ - Local strategy verify cb: ${JSON.stringify(username)}`);

      db.query('SELECT * FROM Users WHERE username =?', [username], function(err, results) {
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
  )
);

app.use("/", router);

app.listen(8082, () => {
  console.log("Listening here...");
});
