
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

/*
app.post('/employees/:id', (req, res) => {
    const query = `SELECT * FROM employees where EmployeeID = '${req.params.id}';`
    db.all(query, (err, rows) => {
        if (err) console.log(err.message);
        console.log(rows);
        res.send(JSON.stringify(rows));
    });
});
*/

/*
app.put('/employees/:id', (req, res) => {
    // req.params.id
    res.send(`Update employee id : ${req.params.id} completed.`)
});
*/

// ------- 3 ------
app.get("/show/:id", (req, res) => {
    const endpoint = `http://localhost:3000/employees/${req.params.id}`;    
    fetch(endpoint)
        .then(response => response.json())
        .then(empl => {
            // console.log(empl);
            res.render('show', { data: empl });            
        })
        .catch(error => {
            console.log(error);
        });
});

app.get("/weather", (req, res) => {
    // city=ชื่อเมือง country=ตัวย่อประเทศ 
    const endpoint = 'http://10.0.15.21:8000/weather/bangkok/th';    
    fetch(endpoint)
        .then(response => response.json())
        .then(airq => {
            console.log(airq);
            res.render('weather', { data: airq });
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});
