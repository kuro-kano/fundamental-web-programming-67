// ส่งงานไม่ได้เว็บล่มครับตอน 23.50

const express = require("express");
const session = require("express-session");
const port = 3000;
const app = express();
const sqlite3 = require('sqlite3').verbose(); 

app.set('view engine', 'ejs'); 

app.use(express.static('styles'));

let db = new sqlite3.Database('customers.db', (err) => {    
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

app.get('/', (req, res) => {
    db.get('SELECT * FROM customers WHERE CustomerId = 2', (err, row) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.render('form', { data: row || {} });
    });
});

app.post('/savedata', (req, res) => {
    req.session.data = req.body;
    res.render('form', { data: {} });
});

app.get('/showdata', (req, res) => {
    res.render('form', { data: req.session.data || {} });
});

app.get('/cleardata', (req, res) => {
    req.session.destroy(() => {
        res.render('form', { data: {} });
    });
});

app.listen(port, '0.0.0.0', () => {                              
    console.log(`Server is running on \n=====================================================\n
        \thttp://localhost:${port}\n
=====================================================\n`);
}); 