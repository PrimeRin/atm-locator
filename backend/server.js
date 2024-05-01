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

app.get('/all_atms', (req, res) =>{
    let sql = `SELECT * FROM atm_info`;

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while fetching ATM information' });
        }
        console.log(result);
        return res.json(result);
    }); 
})

app.get('/query_atm', (req, res) => {
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
                return res.status(500).json({ error: 'An error occurred while fetching ATM information' });
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
                return res.status(500).json({ error: 'An error occurred while fetching ATM information' });
            }
            console.log(result);
            return res.json(result);
        });
    }
});

app.listen(8082, ()=>{
    console.log('Listening here...');
})
