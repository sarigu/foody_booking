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

//get Table
app.get("/seat", (req, res) => {
    con.query("SELECT * FROM Seat", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        return res.send({ data: data });
    });
});

// Add a Table seat
app.post("/seatadd", (req, res) => {
    const sqlInsert = "INSERT INTO `seat` (`SeatID`, `SeatName`, `SeatCapacity`, `SeatStatus`) VALUES (NULL, 'Lounge 5', '25', '0');";
    con.query(sqlInsert, function (err, result) {
        res.send("Data Instrted");
    });
});

// Delete a Table seat
app.get("/deleteseat", (req, res) => {
    // for dynamic
    // const sqlQuery = ("DELETE FROM `seat` WHERE `seat`.`SeatID` = ?", req.query.id);
    const sqlQuery = "DELETE FROM `seat` WHERE `seat`.`SeatID` = 5";
    con.query(sqlQuery, function (err, result) {
        res.redirect('/seat');
    });
});

// Getting id for editing a Table Seat
app.get("/edit", (req, res) => {
    // const sqlQuery = ("SELECT * FROM Seat WHERE SeatID = 1", req.query.id);
    const sqlQuery = "SELECT * FROM Seat WHERE SeatID = 1";
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        res.redirect('/edit');
    });
});

// Update a Table Seat
app.post("/edit", (req, res) => {
    // var param = [
    //     req.body,       //data for update
    //     req.query.id    //condition for update
    // ]
    // const sqlQuery = ("UPDATE `seat` SET ? WHERE `seat`.`SeatID` = ?", param);
    const sqlQuery = "UPDATE `seat` SET `SeatName` = 'VIP Lounge 1' WHERE `seat`.`SeatID` = 1";
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        res.redirect('/seat');
    });
});

//  RUN SERVER

const port = 8000;

app.listen(port, () => {
    console.log("Server is running on port ", port);
});
