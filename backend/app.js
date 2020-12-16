const express = require("express");
const app = express();
const mysql = require('mysql');


//  MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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


//get menu
app.get("/menu", (req, res) => {
    con.query("SELECT * FROM Menu WHERE RestaurantID = 1", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        return res.send({ data: data });
    });
});

//get one random menu item
app.get("/recommendation", (req, res) => {
    con.query("SELECT * FROM Menu ORDER BY RAND() LIMIT 1", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        return res.send({ data: data });
    });
});

//get resturant data
app.get("/restaurantdetails", (req, res) => {
    con.query("SELECT * FROM Restaurant", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        return res.send({ data: data });
    });
});

//update resturant data
app.post("/restaurantdetails", async (req, res) => {
    const { name, address, description, email, phone } = req.body;
    var sql = "UPDATE Restaurant SET name = ?, address = ?, description = ?, email = ? , phone = ?  WHERE RestaurantID = 1";
    con.query(sql, [name, address, description, email, phone], (error) => {
        if (error) {
            return res.status(500).send({ error });
        }
        return res.send({ message: "updated" });
    });
});


//  RUN SERVER

const port = 8000;

app.listen(port, () => {
    console.log("Server is running on port ", port);
});
