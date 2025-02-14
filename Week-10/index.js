
const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

const app = express();

let db = new sqlite3.Database('employee.db', (err) => {
    if (err)
        return console.error(err.message);
    console.log('Connected to the SQlite database.');
});

app.use(express.static('public'));
app.set('view engine', 'ejs');

// routing path

app.get('/', function (req, res) {
    res.render('home.ejs');
});

app.get('/show', function (req, res) {
    const query = 'select * from employees';
    db.all(query, (err, rows) => {
        if (err)
            console.log(err.message);
        console.log(rows);
        res.render('showdata', { data : rows });
    });
});

app.listen(port, () => {
    console.log("Server started.");
})