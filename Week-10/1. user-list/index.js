
const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

const app = express();

let db = new sqlite3.Database('userdata.db', (err) => {
    if (err)
        return console.error(err.message);
    console.log('Connected to the SQlite database.');
});

app.use(express.static('public'));
app.set('view engine', 'ejs');

// routing path
app.get('/', function (req, res) {
    const query = 'select * from users';
    db.all(query, (err, rows) => {
        if (err)
            console.log(err.message);
        console.log(rows);
        res.render('show-user', { data: rows });
    });
});

app.get('/detail' , function (req, res) {
    let sql = `select * from users where id = ${req.query.id}`;
    console.log(sql);

    db.all(sql, (err, rows) => {
        if (err)
            console.log(err.message);
        console.log(rows);
        res.render('show-detail', { data: rows });
    });
})

app.listen(port, () => {
    console.log("Server started.");
})