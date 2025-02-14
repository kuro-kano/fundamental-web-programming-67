
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
        res.render('showdata', { data: rows });
    });
});

app.get('/delete', function (req, res) {
    // delete a row based on id
    let sql = `delete from employees where EmployeeId = ${req.query.id}`;
    console.log(sql);

    db.run(sql, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) deleted.`);
    });
})

app.get('/form', function (req, res) {
    res.render('form');
})

app.get('/formget', function (req, res) {
    let formdata = {
        id: req.query.id,
        fname: req.query.fname,
        lname: req.query.lname,
        title: req.query.title,
        phone: req.query.phone,
        email: req.query.email
    };
    console.log(formdata);  
    //
    let sql = `INSERT INTO employees values ('${formdata.id}', '${formdata.lname}', '${formdata.fname}', '${formdata.title}', '${formdata.phone}', '${formdata.email}')`;
    console.log(sql);
    db.run(sql, (err) => {
        if (err) {
            return console.error('Error inserting data:', err.message);
        }
        console.log('Data inserted successful');
    });
})

app.listen(port, () => {
    console.log("Server started.");
})