require('dotenv').config();
const mysql = require("mysql2");

const db_url = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

const db = mysql.createConnection({
    host: db_url,
    user: user,
    password: password,
    database: database,
}).promise()

module.exports = db;
