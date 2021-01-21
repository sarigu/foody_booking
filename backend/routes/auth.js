const router = require('express').Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');

var auth = false;
var usertype = "";
var userEmail = "";

// MYSQL CONNECTION

const con = mysql.createConnection({
  host: 'aws-foodyapp.cvolzzyzesis.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'AWSfoodyapp3',
  database: 'Foody',
  port: '3306',
});

// FUNCTIONS

function checkUser(email, res) {
  console.log(checkUser);
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


// backend middleware
function isAuth(req, res, next) {
  if (auth !== true) {
    return res.status(401).json({ message: 'Not auth' });
  }
  next();
}

// Routes

router.post('/signup', async (req, res) => {
  checkUser(req.body.email, res);

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const sql = 'INSERT INTO user (email, password, username) VALUES ( ?,  ?,  ?)';
    await con.query(sql, [req.body.email, hashedPassword, req.body.username], (err, result) => {
      if (result) {
        res.status(200).send();
      }
    });
  } catch {
    res.status(500).send();
  }
});

//create staff account
router.post('/create_staff_account', async (req, res) => {
  console.log(req.body);
  checkUser(req.body.email, res);

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const sql = 'INSERT INTO user (email, password, username, usertype) VALUES ( ?,  ?,  ?, "restaurant")';
    await con.query(sql, [req.body.email, hashedPassword, req.body.username], (err, result) => {
      if (result) {
        res.status(200).send();
      }
    });
  } catch {
    res.status(500).send();
  }
});

//create account to make booking in behalf of customer
router.post('/create_account', (req, res) => {
  console.log("create account");
  try {
    const sql = 'INSERT INTO user (email, password, username, usertype) VALUES ( ?, null , ?, "user")';
    con.query(sql, [req.body.email, req.body.username], (err, result) => {
      console.log(result.insertId);
      const userid = result.insertId;
      res.send({ userid: userid });
    });
  } catch {
    res.status(500).send();
  }
});

router.post('/login', (req, res) => {
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
            res.status(500).send({ error: 'Password wrong. Try again.' });
          } else {
            auth = true;
            usertype = user.usertype;
            userEmail = user.email;
            res.status(200).send();
          }
        });
      } else {
        auth = false;
        res.status(500).send({ error: 'User does not exist. Try again.' });
      }
    });
  } else {
    res.status(500).send({ error: 'Password and Email required.' });
  }
});

router.post('/user', (req, res) => {
  console.log("find user");
  const { userEmail } = req.body;
  console.log(req.body.userEmail);
  const sql = 'SELECT * FROM user WHERE email = ?';
  con.query(sql, [userEmail], (error, results) => {
    if (error) throw error;
    const [user] = results;
    console.log(user)
    res.send(user);
  });
});

router.get('/is_auth', (req, res) => {
  if (auth === true) {
    res.send({ auth: true, usertype: usertype, userEmail: userEmail });
  } else {
    res.send({ auth: false });
  }
});

router.get('/logout', (req, res) => {
  console.log('logout clicked');
  auth = false;
  usertype = "";
  userEmail = "";
  console.log(auth, usertype, userEmail)
  return res.status(200).send('sucess');
});

module.exports = router;
