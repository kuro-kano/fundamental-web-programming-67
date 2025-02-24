
const express = require("express");
const path = require("path");
const port = 3000;

const app = express();

app.use(express.static('public'));
app.use(express.static('styles'));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    const endpoint = "http://10.0.15.21:8000/countries";
    fetch(endpoint)
    .then(response => response.json())
    .then(ctry => {
        // ? console.log(ctry);
        res.render("countries", { data: ctry });
    })
    .catch(error => {
        console.log(error);
    })
})

app.listen(port, () => {
    console.log(`Starting node.js at port ${port}`);
})
