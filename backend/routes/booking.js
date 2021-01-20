const router = require('express').Router();
const mysql = require('mysql');

// MYSQL CONNECTION
const con = mysql.createConnection({
  host: 'aws-foodyapp.cvolzzyzesis.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'AWSfoodyapp3',
  database: 'Foody',
  port: '3306',
});

// FUNCTIONS
//  get menu
router.get('/menu', (req, res) => {
  con.query('SELECT * FROM menu WHERE RestaurantID = 1', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

//  add menu item
router.post('/menu/items', (req, res) => {
  try {
    const sql = 'INSERT INTO menu (Item, Price, Description, RestaurantID) VALUES ( ?,  ?,  ?, ?)';
    con.query(sql, [req.body.menuItem, req.body.price, req.body.description, 1], (err, result) => {
      if (result) {
        res.status(200).send();
      }
    });
  } catch {
    res.status(500).send();
  }
});

//  update menu item
router.post('/menu/item/', (req, res) => {
  console.log(req.body);
  const {
    itemID, item, price, description,
  } = req.body;

  const sql = 'UPDATE menu SET Item = ?, Price = ?, Description = ? WHERE MenuID = ?';
  con.query(sql, [item, price, description, itemID], (error) => {
    if (error) {
      return res.status(500).send({ error });
    }
    return res.status(200).send();
  });
});

//  delete menu item
router.get('/menu/item/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM menu WHERE MenuID = ?';

  con.query(sql, [id], (err, result) => {
    if (result) {
      console.log('delete');
      res.status(200).send();
    }
  });
});

//  get one random menu item
router.get('/recommendation', (req, res) => {
  con.query('SELECT * FROM menu ORDER BY RAND() LIMIT 1', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

//  get restaurant data
router.get('/restaurantdetails', (req, res) => {
  con.query('SELECT * FROM restaurant', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

//  update restaurant data
router.post('/restaurantdetails', async (req, res) => {
  const {
    name, address, description, email, phone,
  } = req.body;
  const sql = 'UPDATE restaurant SET name = ?, address = ?, description = ?, email = ? , phone = ?  WHERE RestaurantID = 1';
  con.query(sql, [name, address, description, email, phone], (error) => {
    if (error) {
      return res.status(500).send({ error });
    }
    return res.send({ message: 'updated' });
  });
});

// ------- get all Timeslots
router.get('/timeslots', (req, res) => {
  con.query('SELECT * FROM timeslot  ORDER BY StartTime', (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      data = JSON.parse(JSON.stringify(result));
      return res.send(data);
    }
    res.send({ message: 'no entries' });
  });
});

// get available tables
router.get('/tables/:groupsize/:timeslotID/:date', (req, res) => {
  const { groupsize, timeslotID, date } = req.params;
  const sql = 'SELECT * FROM tables WHERE TableStatus = 0 AND Date = ? AND TimeslotID = ? AND Capacity >= ?';
  con.query(sql, [date, timeslotID, groupsize], (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      data = JSON.parse(JSON.stringify(result));
      return res.send(data);
    }
    res.send({ message: 'no entries' });
  });
});

//        ---------------------------------------

// get Table
router.get('/bookings', (req, res) => {
  con.query('SELECT * FROM booking', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

// Add a Table seat
router.post('/seatadd', (req, res) => {
  console.log(req.body);
  console.log("seat");
  /* const sqlInsert = "INSERT INTO `seat` (`SeatID`, `SeatName`, `SeatCapacity`, `SeatStatus`) VALUES (NULL, 'Lounge 5', '25', '0');";
   con.query(sqlInsert, (err, result) => {
     res.send('Data Instrted');
   });*/
});

// Delete a Table seat
router.get('/deleteseat', (req, res) => {
  // for dynamic
  // const sqlQuery = ("DELETE FROM `seat` WHERE `seat`.`SeatID` = ?", req.query.id);
  const sqlQuery = 'DELETE FROM `seat` WHERE `seat`.`SeatID` = 5';
  con.query(sqlQuery, (err, result) => {
    res.redirect('/seat');
  });
});

// Getting id for editing a Table Seat
router.get('/edit', (req, res) => {
  // const sqlQuery = ("SELECT * FROM Seat WHERE SeatID = 1", req.query.id);
  const sqlQuery = 'SELECT * FROM seat WHERE SeatID = 1';
  con.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.redirect('/edit');
  });
});

// Update a Table Seat
router.post('/edit', (req, res) => {
  // var param = [
  //     req.body,       //data for update
  //     req.query.id    //condition for update
  // ]
  // const sqlQuery = ("UPDATE `seat` SET ? WHERE `seat`.`SeatID` = ?", param);
  const sqlQuery = "UPDATE `seat` SET `SeatName` = 'VIP Lounge 1' WHERE `seat`.`SeatID` = 1";
  con.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.redirect('/seat');
  });
});

// Add Timeslot
router.post('/timeslot', (req, res) => {
  con.query('SELECT * FROM timeslot ORDER BY Date', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    for (const val of data) {
      console.log(val.Date);
      if (val.date == request.body.Date) {
        con.query('SELECT * FROM timeslot where Date = ?', val.date, (err, result) => {
          datatime = JSON.parse(JSON.stringify(result));
          for (const slottime of datatime) {
            if (request.body.StartTime >= slottime.StartTime
              && request.body.StartTime < slottime.EndTime
              || request.body.EndTime > slottime.StartTime
              && request.body.EndTime < slottime.EndTime
            ) { pass; } else {
              const sqlInsert = "INSERT INTO `timeslot` (`TimeSlotID`, `SeatID`, `Date`, `StartTime`, `EndTime`) VALUES (NULL, '4', '2020-12-02', '14:30', '20:30')";
              con.query(sqlInsert, (err, result) => {
                res.send('Data Instrted');
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
router.get('/deletetimeslot', (req, res) => {
  // for dynamic
  // const sqlQuery = ("DELETE FROM `timeslot` WHERE `timeslot`.`TimeSlotID` = ?", req.query.id);
  const sqlQuery = 'DELETE FROM `timeslot` WHERE `timeslot`.`TimeSlotID` = 3';
  con.query(sqlQuery, (err, result) => {
    res.redirect('/timeslot');
  });
});

// Getting id for editing a TimeSlot
router.get('/edittimeslot', (req, res) => {
  // const sqlQuery = ("SELECT * FROM Seat WHERE TimeSlotID = ?", req.query.id);
  const sqlQuery = 'SELECT * FROM seat WHERE TimeSlotID = 1';
  con.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.redirect('/edittimeslot');
  });
});

// Update a Timeslot
router.post('/edittimeslot', (req, res) => {
  // var param = [
  //     req.body,       //data for update
  //     req.query.id    //condition for update
  // ]
  // const sqlQuery = ("UPDATE `timeslot` SET ? WHERE `timeslot`.`TimeSlotID` = ?", param);
  const sqlQuery = "UPDATE `timeslot` SET `StartTime` = '13:00:00' WHERE `timeslot`.`TimeSlotID` = 3";
  con.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.redirect('/timeslot');
  });
});

// get Booking
router.get('/booking', (req, res) => {
  con.query('SELECT * FROM booking', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

function makeTableUnavailable(tableID) {
  const sql = 'UPDATE tables SET TableStatus = 1 WHERE TableID = ?';
  con.query(sql, [tableID], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}

// -------------------  Add Booking
router.post('/bookingadd', (req, res) => {
  const { timeslotID } = req.body;
  const { userID } = req.body;
  const { tableID } = req.body;
  const sql = 'INSERT INTO `booking` (`TimeSlotID`, `UserID`, `TableID`,`BookingStatus`) VALUES ( ? , ?, ?, 1)';
  con.query(sql, [timeslotID, userID, tableID], (err, result) => {
    if (err) throw err;
    makeTableUnavailable(tableID);
    res.send({ message: 'Booking Added' });
  });



  /* con.query('SELECT * FROM booking', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    console.log(data);
    for (val in data) {
      console.log(val.TimeSlotID)
      if (val.TimeSlotID === timeslotID) {
        console.log("booked");
        res.send({ message: 'already booked' });
      } else {
        console.log("for real");
        const sql = 'INSERT INTO `booking` (`TimeSlotID`, `UserID`, `TableID`,`BookingStatus`) VALUES ( ? , ?, ?, 1)';
        con.query(sql, [timeslotID, userID, tableID], (err, result) => {
          res.send({ message: 'Booking Added' });
        });
      }
    }
  }); */
});

// Delete a Booking
router.get('/deletebooking', (req, res) => {
  // for dynamic
  // const sqlQuery = ("DELETE FROM `booking` WHERE `booking`.`BookingID` = ?", req.query.id);
  const sqlQuery = 'DELETE FROM `booking` WHERE `booking`.`BookingID` = 5';
  con.query(sqlQuery, (err, result) => {
    res.redirect('/booking');
  });
});

// Getting id for editing a Booking
router.get('/editbooking', (req, res) => {
  // const sqlQuery = ("SELECT * FROM Seat WHERE BookingID = ?", req.query.id);
  const sqlQuery = 'SELECT * FROM seat WHERE BookingID = 1';
  con.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.redirect('/editbooking');
  });
});

// Update a Booking
router.post('/editbooking', (req, res) => {
  // var param = [
  //     req.body,       //data for update
  //     req.query.id    //condition for update
  // ]
  // const sqlQuery = ("UPDATE `booking` SET ? WHERE `booking`.`BookingID` = ?", param);
  const sqlQuery = "UPDATE `booking` SET `UserID` = '1' WHERE `booking`.`BookingID` = 1";
  con.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.redirect('/booking');
  });
});

module.exports = router;
