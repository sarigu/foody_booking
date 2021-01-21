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

// get all Timeslots
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

//get staff
router.get('/staff', (req, res) => {
  con.query('SELECT * FROM user WHERE usertype = "restaurant"', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

// after booking cancellation make table available
function makeTableAvailable(tableID) {
  const sql = 'UPDATE tables SET TableStatus = 0 WHERE TableID = ?';
  con.query(sql, [tableID], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}

// after booking make table unavailable
function makeTableUnavailable(tableID) {
  const sql = 'UPDATE tables SET TableStatus = 1 WHERE TableID = ?';
  con.query(sql, [tableID], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}

// make booking
router.post('/booking', (req, res) => {
  const { timeslotID } = req.body;
  const { userID } = req.body;
  const { tableID } = req.body;
  const sql = 'INSERT INTO `booking` (`TimeSlotID`, `UserID`, `TableID`,`BookingStatus`) VALUES ( ? , ?, ?, 1)';
  con.query(sql, [timeslotID, userID, tableID], (err, result) => {
    if (err) throw err;
    makeTableUnavailable(tableID);
    res.send({ message: 'Booking Added' });
  });
});

// get all bookings
router.get('/bookings/', (req, res) => {
  con.query('SELECT * FROM booking INNER JOIN user ON user.id = booking.UserID INNER JOIN timeslot ON timeslot.TimeSlotID = booking.TimeSlotID INNER JOIN tables ON tables.TableID = booking.TableID', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    console.log(data);
    return res.send({ data });
  });
});

// get bookings for a certain user
router.get('/bookings/:userid', (req, res) => {
  console.log("bookings");
  const { userid } = req.params;
  console.log(userid);
  const sql = 'SELECT * FROM booking INNER JOIN user ON user.id = booking.UserID INNER JOIN timeslot ON timeslot.TimeSlotID = booking.TimeSlotID INNER JOIN tables ON tables.TableID = booking.TableID WHERE booking.UserID = ?';
  con.query(sql, [userid], (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});


//delete a booking
router.get('/bookings/:id/:table', (req, res) => {
  const { id, table } = req.params;
  console.log(id);
  console.log(table);
  const sql = 'DELETE FROM booking WHERE BookingID=?';
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    if (data) {
      makeTableAvailable(table);
      return res.status(200).send();
    }
  });

});

//        ---------------------------------------------------------------------------------

module.exports = router;
