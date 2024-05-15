const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const db = require("./database");

const router = express.Router();

router.post("/login", (req, res, next) => {
  console.log(`1 - Login handler`);
  passport.authenticate("local", (err, user) => {
    console.log(req.sessionID);
    console.log(`3 - Passport authenticate cb ${JSON.stringify(user)}`);

    if (err || !user) {
      return res.status(401).json({
        timestamp: Date.now(),
        message: `Access denied. Username or password is incorrect.`,
        code: 401,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log('Set-Cookie header:', res);
      res.status(200).json({
        success: true,
        message: "success",
      });
    });
  })(req, res, next);
});

// Registration route
router.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { username, role } = req.body;

    const result = await db.query(
      "INSERT INTO Users (username, password, role) VALUES (?,?,?)",
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

// Middleware to check if the user is authenticated
const requireAuth = passport.authenticate('local', { session: true });

router.get("/query_atm", (req, res) => {
  console.log(req.sessionID);
  const { dzongkhag, page, limit = 10 } = req.query;
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
      return res.json(result);
    });
  }
});

module.exports = router;
