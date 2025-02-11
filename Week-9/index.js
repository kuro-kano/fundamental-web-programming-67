// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// เพิ่มใช้งานไฟล์
const conn = require('./dbconn.js');
const { name } = require('ejs');

// static resourse & template engine

// static resourse
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

// routing

/**** lab9/1 ****/
app.get('/create', function (req, res) {
    let sql = `CREATE TABLE users ( \
    username VARCHAR(20) NOT NULL PRIMARY KEY, \
    password VARCHAR(20), \
    email VARCHAR(20), \
    firstname VARCHAR(20), \
    lastname VARCHAR(20), \
    age INT(3), \
    address VARCHAR(50), \
    phone VARCHAR(15) \
    );`

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Created successfully.");
    })
})

/***** lab9/2 *****/
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/login.html"));
})

app.get('/process_check', function (req, res) {

    let logindata = {
        username: req.query.username,
        password: req.query.password
    };

    let sql = `select username, email, password from users where username = '${logindata.username}' or email = '${logindata.username}';`;
    console.log(sql);
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("a record founded");

        if (result.length == 0) {
            // console.log(`saved_passwd: ${result[0].password}, input_passwd: ${logindata.password}`);
            return res.json({ status: "not found", message: "Username or Email not found." });
        } else if (logindata.password != result[0].password) {
            return res.json({ status: "wrong passwd", message: "Wrong Password, Please try again." })
        } else if (logindata.password == result[0].password) {
            return res.json({ status: "success", message: `Login Successfully!!` });
        } else {
            return res.json({ status: "error", message: "An error occurred, please try again."});
        }
    });
})


/**** tutorial ****/
app.get('/show', function (req, res) {

    // ให้แสดงข้อมูล จาก table instructor และ teaches
    // ดังนี้ ID name dept_name course_id semester year

    //for show.ejs
    const sql = 'select * from classroom ;';
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('show', { data: result })
        res.end()
    })

})

/**** lab9/3 ****/
app.get('/songs', function (req, res) {

    const sql = 'select s.song_name, a.artist_name as artist, s.song_release_date, s.song_type \
    from songs s join artists a on s.artist = a.artist_id;';
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('songs', { data: result })
        res.end()
    })

})

/*** ทำเล่น ***/
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/register.html"));
});

app.get('/process_get', function (req, res) {
    let formdata = {
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        age: req.query.age,
        address: req.query.address,
        phone: req.query.phone,
    };
    console.log(formdata);

    let sql = `INSERT INTO users VALUES ('${formdata.username}', '${formdata.password}', '${formdata.email}', '${formdata.firstname}','${formdata.lastname}', ${formdata.age}, '${formdata.address}', '${formdata.phone}');`;

    console.log(sql);
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("a record inserted");
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});