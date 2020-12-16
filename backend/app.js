const express = require("express");
const app = express();
const mysql = require('mysql');


//  MIDDLEWARE

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


//  MYSQL CONNECTION

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root_1234",
    database: "foody",
    port: "3306"
});


//  FUNCTIONS 

app.get("/menu", (req, res) => {
    con.query("SELECT * FROM Menu", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        return res.send({ data: data });
    });
});

app.get("/recommendation", (req, res) => {
    con.query("SELECT * FROM Menu ORDER BY RAND() LIMIT 1", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        return res.send({ data: data });
    });
});



//  RUN SERVER

const port = 8000;

app.listen(port, () => {
    console.log("Server is running on port ", port);
});
