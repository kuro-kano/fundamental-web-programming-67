
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
    const endpoint = `http://localhost:3000/todo`;
    fetch(endpoint)
    .then(response => response.json())
    .then(tdl => {
        console.log(tdl);
        res.render(`todo-list`, { data: tdl });
    })
    .catch(error => {
        console.log(error);
    });
});

app.post("/update/:id", (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    // แปลง Boolean เป็น 1 หรือ 0
    const completedValue = completed ? 1 : 0;

    const query = `UPDATE todo SET completed = ? WHERE id = ?`;

    db.run(query, [completedValue, id], function (err) {
        if (err) {
            console.log("Database error:", err.message);
            return res.status(500).send("Database Error");
        }
        console.log(`Todo ID ${id} updated to ${completedValue}`);
        res.sendStatus(200);
    });
});


app.get('/todo', (req, res) => {
    const query = `select * from todo;`;
    db.all(query, (err, rows) => {
        if (err) console.log(err.message);
        // console.log(rows);
        res.send(JSON.stringify(rows));
    });
});

app.listen(port, () => {
    console.log(`Starting node,js at port ${port}`);
});
