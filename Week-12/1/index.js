// ส่งงานไม่ได้เว็บล่มครับตอน 23.50

const express = require('express');
const cookieParser = require('cookie-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const PORT = 3000;

const app = express();
const db = new sqlite3.Database('./customers.db');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    db.get('SELECT * FROM customers WHERE CustomerId = 18', (err, row) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        const data = req.cookies.data ? JSON.parse(req.cookies.data) : row || {};
        res.render('form', { data });
    });
});

app.post('/savedata', (req, res) => {
    res.cookie('data', JSON.stringify(req.body), { maxAge: 900000, httpOnly: true });
    res.render('form', { data: {} });
});

app.get('/showdata', (req, res) => {
    const data = req.cookies.data ? JSON.parse(req.cookies.data) : {};
    res.render('form', { data });
});

app.get('/cleardata', (req, res) => {
    res.clearCookie('data');
    res.render('form', { data: {} });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 