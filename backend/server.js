require('dotenv').config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const db_url = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

const db = mysql.createConnection({
    host: db_url,
    user: user,
    password: password,
    database: database,
})

const app = express();
app.use(cors())

app.get('/', (req, res)=>{
    console.log(db_url);
    console.log(user);
    console.log(password);
    console.log(database);
    return res.json('FROM THE BACKEND');
})

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM User";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).json({ error: 'An error occurred while fetching users' });
        }
        console.log(result);
        return res.json(result);
    });
});

app.listen(8082, ()=>{
    console.log('Listening here...');
})