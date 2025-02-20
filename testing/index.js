
const express = require("express");
const path = require("path");
const port = 3000;

const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();

let db = new sqlite3.Database('userdata.db', (err)=>{
    if (err) return console.log(err.message);
    console.log("Connected to the SQlite database");
})

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/register.html"));
});

app.get('/register', function (req, res) {
    let form = {
        username: req.query.username,
        password: req.query.password
    };
    console.log(form);

    bcrypt.hash(form.password, 10, (err, hashedPassword) => {
        if (err) throw err;

        let query = `insert into users (username, password) values (?, ?)`;
        db.run(query, [form.username, hashedPassword], function (err) {
            if (err) return err.message;
            console.log(`User data inserted`);
            res.send("User registered successfully");
        });
    });
});

app.get('/login', function (req, res) {
    
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});