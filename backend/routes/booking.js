const router = require('express').Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

let auth = false;
let usertype = '';
let userEmail = '';
let userFirstName = '';

// ----------   MYSQL CONNECTION
const con = mysql.createConnection({
  host: 'aws-foodyapp.cvolzzyzesis.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'AWSfoodyapp3',
  database: 'Foody',
  port: '3306',
});

// ----------  AUTH FUNCTIONS

// backend middleware
function isAuth(req, res, next) {
  if (auth !== true) {
    return res.status(401).json({ message: 'Not auth' });
  }
  next();
}

// check if user is in db already
function checkUser(email, res) {
  const sql = 'SELECT * FROM user WHERE email=?';
  con.query(sql, [email], (error, results) => {
    if (error) throw error;
    const [user] = results;
    if (user) {
      console.log('user exists');
      res.status(400).send({ message: 'User already exists' });
    }
  });
}

// sign up an user
router.post('/auth/signup', async (req, res) => {
  const {
    email, password, firstName, lastName,
  } = req.body;
  checkUser(email, res);
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const sql = 'INSERT INTO user (email, password, firstName, lastName) VALUES ( ?,  ?,  ?,  ?)';
    await con.query(sql, [email, hashedPassword, firstName, lastName], (err, result) => {
      if (result) {
        res.status(200).send();
      }
    });
  } catch {
    res.status(500).send();
  }
});

// login
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM user WHERE email = ?';
  if (email && password) {
    con.query(sql, [email], (error, results) => {
      if (error) throw error;
      const [user] = results;
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          console.log(result);
          if (!result) {
            auth = false;
            res.status(401).send({ error: 'Password wrong. Try again.' });
          } else {
            auth = true;
            usertype = user.usertype;
            userEmail = user.email;
            userFirstName = user.firstName;
            res.status(200).send();
          }
        });
      } else {
        auth = false;
        res.status(401).send({ error: 'User does not exist. Try again.' });
      }
    });
  } else {
    res.status(401).send({ error: 'Password and Email required.' });
  }
});

// create staff account
router.post('/auth/create_staff_account', async (req, res) => {
  const {
    email, password, firstName, lastName,
  } = req.body;
  checkUser(email, res);

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = 'INSERT INTO user (email, password, usertype, firstName, lastName) VALUES (  ?,  ?, "restaurant", ?, ?)';
    await con.query(sql, [email, hashedPassword, firstName, lastName], (err, result) => {
      if (result) {
        res.status(200).send();
      }
    });
  } catch {
    res.status(500).send();
  }
});

// create account to make booking in behalf of customer (not account customer can use actually)
router.post('/auth/create_account', (req, res) => {
  const { email, firstName, lastName } = req.body;
  try {
    const sql = 'INSERT INTO user (email, password, usertype, firstName, lastName) VALUES ( ?, null, "user", ?, ?)';
    con.query(sql, [email, firstName, lastName], (err, result) => {
      console.log(result.insertId);
      const userid = result.insertId;
      res.send({ userid });
    });
  } catch {
    res.status(500).send();
  }
});

// get a user from db with provided email
router.post('/auth/user', (req, res) => {
  const { userEmail } = req.body;
  const sql = 'SELECT * FROM user WHERE email = ?';
  con.query(sql, [userEmail], (error, results) => {
    if (error) throw error;
    const [user] = results;
    res.send(user);
  });
});

// check if user is logged in
router.get('/auth/is_auth', (req, res) => {
  if (auth === true) {
    res.send({
      auth: true, usertype, userEmail, userFirstName,
    });
  } else {
    res.send({ auth: false });
  }
});

// log out
router.get('/auth/logout', (req, res) => {
  console.log('logout clicked');
  auth = false;
  usertype = '';
  userEmail = '';
  userFirstName = '';
  return res.status(200).send('success');
});

// ----------  Booking FUNCTIONS

// ----------  Menu ----------

//  get menu
router.get('/menu', isAuth, (req, res) => {
  console.log(auth);
  con.query('SELECT * FROM menu WHERE RestaurantID = 1', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

//  add menu item
router.post('/menu/items', isAuth, (req, res) => {
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
router.post('/menu/item/', isAuth, (req, res) => {
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
router.get('/menu/item/:id', isAuth, (req, res) => {
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
router.get('/recommendation', isAuth, (req, res) => {
  con.query('SELECT * FROM menu ORDER BY RAND() LIMIT 1', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

// ----------  Restaurant Info ----------

//  get restaurant data
router.get('/restaurantdetails', isAuth, (req, res) => {
  con.query('SELECT * FROM restaurant', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

//  update restaurant data
router.post('/restaurantdetails', isAuth, async (req, res) => {
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

// get staff
router.get('/staff', isAuth, (req, res) => {
  con.query('SELECT * FROM user WHERE usertype = "restaurant"', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

// ----------  Emails ----------

function sendConfirmationMail(userEmail) {
  console.log('send email');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sarigucki@gmail.com',
      pass: 'password',
    },
  });

  const mailOptions = {
    from: 'sarigucki@gmail.com',
    to: userEmail,
    subject: 'Booking Confirmation',
    text: 'You booked a table',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

// ----------  Booking ----------

// get all Timeslots
router.get('/timeslots', isAuth, (req, res) => {
  con.query('SELECT * FROM timeslot ORDER BY StartTime', (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      data = JSON.parse(JSON.stringify(result));
      return res.send(data);
    }
    res.send({ message: 'no entries' });
  });
});

// get available tables for when in booking flow
router.get('/tables/:groupsize/:timeslotID/:date', isAuth, (req, res) => {
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

// get available tables overview
router.get('/tables/:timeslotID/:date', isAuth, (req, res) => {
  const { timeslotID, date } = req.params;
  const sql = 'SELECT * FROM tables WHERE Date = ? AND TimeslotID = ?';
  con.query(sql, [date, timeslotID], (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      data = JSON.parse(JSON.stringify(result));
      return res.send(data);
    }
    res.send({ message: 'no entries' });
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

// make booking (changed)
router.post('/booking', isAuth, (req, res) => {
  const {
    timeslotID, userID, tableID, userEmail,
  } = req.body;
  const sql = 'INSERT INTO `booking` (`TimeSlotID`, `UserID`, `TableID`,`BookingStatus`) VALUES ( ? , ?, ?, 1)';
  con.query(sql, [timeslotID, userID, tableID], (err, result) => {
    if (err) throw err;
    makeTableUnavailable(tableID);
    sendConfirmationMail(userEmail);
    res.status(200).send({ message: 'Booking Added' });
  });
});

// get all bookings
router.get('/bookings/', isAuth, (req, res) => {
  con.query('SELECT * FROM booking INNER JOIN user ON user.id = booking.UserID INNER JOIN timeslot ON timeslot.TimeSlotID = booking.TimeSlotID INNER JOIN tables ON tables.TableID = booking.TableID', (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    activeBookings = [];
    oldBookings = [];
    console.log(data);
    if (data.BookingStatus === 1) {
      oldBookings.push(data);
    } else {
      activeBookings.push(data);
    }
    return res.send({ activeBookings, oldBookings });
  });
});

// get bookings for a certain user
router.get('/bookings/:userid', isAuth, (req, res) => {
  console.log('bookings');
  const { userid } = req.params;
  console.log(userid);
  const sql = 'SELECT * FROM booking INNER JOIN user ON user.id = booking.UserID INNER JOIN timeslot ON timeslot.TimeSlotID = booking.TimeSlotID INNER JOIN tables ON tables.TableID = booking.TableID WHERE booking.UserID = ?';
  con.query(sql, [userid], (err, result) => {
    if (err) throw err;
    data = JSON.parse(JSON.stringify(result));
    return res.send({ data });
  });
});

// delete a booking
router.get('/bookings/:id/:table', isAuth, (req, res) => {
  const { id, table } = req.params;
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

// create available table
router.post('/add_table', isAuth, (req, res) => {
  const {
    name, capacity, date, timeslotID,
  } = req.body;
  const sql = 'INSERT INTO `tables` (`Name`, `Capacity`, `TableStatus`, `TimeslotID`,`Date`) VALUES ( ? , ? , 0, ?, ?)';
  con.query(sql, [name, capacity, timeslotID, date], (err, result) => {
    if (err) throw err;
    res.status(200).send({ message: 'table added' });
  });
});

module.exports = router;
