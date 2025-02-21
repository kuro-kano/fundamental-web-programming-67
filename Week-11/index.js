
const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('employees.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hello! REST API");
});

app.get('/employees', (req, res) => {
    const query = 'SELECT * FROM employees ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));        
    });
});

app.get('/employees/:id', (req, res) => {
    const query = `SELECT * FROM employees where EmployeeID = '${req.params.id}';`
    db.all(query, (err, rows) => {
        if (err) console.log(err.message);
        console.log(rows);
        res.send(JSON.stringify(rows));
    });
});

app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});
