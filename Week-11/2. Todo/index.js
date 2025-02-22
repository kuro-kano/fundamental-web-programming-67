
const express = require('express');
const path = require('path');
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

const app = express();

let db = new sqlite3.Database('todolist.db', (err) => {
    if (err) return console.log(err.message);
    console.log('Connected to the SQlite database.');
});

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const query = `select * from todo;`;
    db.all(query, (err, rows) => {
        if (err) console.log(err.message);
        console.log(rows);
        res.render("todo-list", { data: rows });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Starting node,js at port ${port}`);
});
