require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportConfig = require("./passport-config");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const db = require("./database.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Configure Express to use sessions
app.use(
  session({
    secret: "ertyudhgghjsdbbjdsbjsdfvdffds",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize connect-flash
app.use(flash());

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Apply Passport configuration
passportConfig(passport);

app.post("/login", passport.authenticate("local", { session: false }), async (req, res, next) => {
  try {
    const user = req.user;
    console.log("User object:", user); 
    if (user) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Login failed" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "An error occurred during login" });
  }
});

// Registration route
app.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { username, role } = req.body;

    const result = await db.query(
      "INSERT INTO Users (user_name, password, role) VALUES (?,?,?)",
      [username, hashedPassword, role]
    );

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(400).json({ message: "Registration failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

app.get("/login", (req, res) => {
  return res.json("THIS IS THE LOGIN PAGE");
});

app.get("/", (req, res) => {
  return res.json("FROM THE BACKEND");
});

app.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("Welcome to the dashboard!");
  } else {
    res.redirect("/login");
  }
});

app.get("/all_atms", (req, res) => {
  let sql = `SELECT * FROM atm_info`;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching ATM information" });
    }
    console.log(result);
    return res.json(result);
  });
});

app.get('/atm/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM atm_info WHERE id =?';
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});


app.get("/query_atm", (req, res) => {
  const { dzongkhag, page, limit = 30 } = req.query;
  let offset = 0;

  if (!page) {
    let sql = `SELECT * FROM atm_info`;
    let params = [];

    if (dzongkhag) {
      sql += ` WHERE dzongkhag = ?`;
      params = [dzongkhag];
    }

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching ATM information" });
      }
      console.log(result);
      return res.json(result);
    });
  } else {
    offset = (parseInt(page) - 1) * limit;
    let sql = `SELECT * FROM atm_info LIMIT ? OFFSET ?`;
    let params = [limit, offset];

    if (dzongkhag) {
      sql = `SELECT * FROM atm_info WHERE dzongkhag = ? LIMIT ? OFFSET ?`;
      params = [dzongkhag, limit, offset];
    }

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching ATM information" });
      }
      console.log(result);
      return res.json(result);
    });
  }
});

app.listen(8082, () => {
  console.log("Listening here...");
});
