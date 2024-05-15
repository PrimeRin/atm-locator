require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./lib/router");
const db = require("./lib/database");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// Session middleware
app.use(session({
  secret: 'session_secret',
  resave: false,
  saveUninitialized: true,
}));

app.use("/", router);

app.listen(8082, () => {
  console.log("Listening here...");
});
