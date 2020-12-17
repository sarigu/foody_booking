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



//get Timeslot
app.get("/timeslot", (req, res) => {
    con.query("SELECT * FROM timeslot ORDER BY Date", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        for(let val of data) {
            console.log(val.Date)
        }
        return res.send({ data: data });
    });
});

// Add Timeslot
app.post("/timeslot", (req, res) => {
    con.query("SELECT * FROM timeslot ORDER BY Date", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        for(let val of data) {
            console.log(val.Date)
            if (val.date == request.body.Date) {
                con.query("SELECT * FROM timeslot where Date = ?", val.date, function (err, result) {
                    datatime = JSON.parse(JSON.stringify(result));
                    for(let slottime of datatime) {
                        if( request.body.StartTime >= slottime.StartTime && 
                            request.body.StartTime < slottime.EndTime ||
                            request.body.EndTime > slottime.StartTime &&
                            request.body.EndTime < slottime.EndTime
                        ) { pass; } else {
                                const sqlInsert = "INSERT INTO `timeslot` (`TimeSlotID`, `SeatID`, `Date`, `StartTime`, `EndTime`) VALUES (NULL, '4', '2020-12-02', '14:30', '20:30')";
                                con.query(sqlInsert, function (err, result) {
                                    res.send("Data Instrted");
                                });                                
                        }
                    }
                });
            }
        }
    });
    // const sqlInsert = "INSERT INTO `timeslot` (`TimeSlotID`, `SeatID`, `Date`, `StartTime`, `EndTime`) VALUES (NULL, '4', '2020-12-02', '14:30', '20:30')";
    // con.query(sqlInsert, (err, result) => {
    //     res.send("Data Instrted");
    // });
});

// Delete a TimeSlot
app.get("/deletetimeslot", (req, res) => {
    // for dynamic
    // const sqlQuery = ("DELETE FROM `timeslot` WHERE `timeslot`.`TimeSlotID` = ?", req.query.id);
    const sqlQuery = "DELETE FROM `timeslot` WHERE `timeslot`.`TimeSlotID` = 3";
    con.query(sqlQuery, function (err, result) {
        res.redirect('/timeslot');
    });
});

// Getting id for editing a TimeSlot
app.get("/edittimeslot", (req, res) => {
    // const sqlQuery = ("SELECT * FROM Seat WHERE TimeSlotID = ?", req.query.id);
    const sqlQuery = "SELECT * FROM Seat WHERE TimeSlotID = 1";
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        res.redirect('/edittimeslot');
    });
});

// Update a Timeslot
app.post("/edittimeslot", (req, res) => {
    // var param = [
    //     req.body,       //data for update
    //     req.query.id    //condition for update
    // ]
    // const sqlQuery = ("UPDATE `timeslot` SET ? WHERE `timeslot`.`TimeSlotID` = ?", param);
    const sqlQuery = "UPDATE `timeslot` SET `StartTime` = '13:00:00' WHERE `timeslot`.`TimeSlotID` = 3";
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        res.redirect('/timeslot');
    });
});

//get Booking
app.get("/booking", (req, res) => {
    con.query("SELECT * FROM booking", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        return res.send({ data: data });
    });
});

// Add Booking
app.post("/bookingadd", (req, res) => {
    con.query("SELECT * FROM booking", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        for (val in data){
            if (val.TimeSlotID == request.query.TimeSlotID)
            {
                res.send("Already Booked");
            } else {
                const sqlInsert = "INSERT INTO `booking` (`BookingID`, `TimeSlotID`, `UserID`, `Status`) VALUES (NULL, '1', '1', '1');";
                con.query(sqlInsert, function (err, result) {
                    res.send("Booking Added");
                });
            }
        }
    });
    // const sqlInsert = "INSERT INTO `booking` (`BookingID`, `TimeSlotID`, `UserID`, `Status`) VALUES (NULL, '1', '1', '1');";
    // con.query(sqlInsert, function (err, result) {
    //     res.send("Data Instrted");
    // });
});

// Delete a Booking
app.get("/deletebooking", (req, res) => {
    // for dynamic
    // const sqlQuery = ("DELETE FROM `booking` WHERE `booking`.`BookingID` = ?", req.query.id);
    const sqlQuery = "DELETE FROM `booking` WHERE `booking`.`BookingID` = 5";
    con.query(sqlQuery, function (err, result) {
        res.redirect('/booking');
    });
});

// Getting id for editing a Booking
app.get("/editbooking", (req, res) => {
    // const sqlQuery = ("SELECT * FROM Seat WHERE BookingID = ?", req.query.id);
    const sqlQuery = "SELECT * FROM Seat WHERE BookingID = 1";
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        res.redirect('/editbooking');
    });
});

// Update a Booking
app.post("/editbooking", (req, res) => {
    // var param = [
    //     req.body,       //data for update
    //     req.query.id    //condition for update
    // ]
    // const sqlQuery = ("UPDATE `booking` SET ? WHERE `booking`.`BookingID` = ?", param);
    const sqlQuery = "UPDATE `booking` SET `UserID` = '1' WHERE `booking`.`BookingID` = 1";
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        res.redirect('/booking');
    });
});

//  RUN SERVER
const port = 8000;

app.listen(port, () => {
    console.log("Server is running on port ", port);
});
