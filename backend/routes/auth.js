const router = require('express').Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');

let auth = false;
let usertype = '';

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
            res.status(200).send();
          }
        });
      } else {
        auth = false;
        res.status(500).send({ error: 'User does not exist. Try again.' });
      }
      return res.status(200).send();
    });
  }
});

router.get('/test', isAuth, (req, res) => {
  console.log(auth);
  return res.send({ hello: 'jello' });
});

router.get('/is_auth', (req, res) => {
  if (auth !== true) {
    res.send({ auth: false });
  } else {
    res.send({ auth: true, usertype });
  }
});

/* router.get('/is_user', (req, res) => {
  const { email } = req.body;
  const sql = `SELECT * FROM user WHERE email = ?`;
  con.query(sql, [email], (error, results) => {
    if (error) throw error;
    var [user] = results;
    if (user) {
      console.log(user.username);
      console.log(user.usertype);
    }
  });
}); */

router.get('/logout', (req, res) => {
  console.log('logout clicked');
  auth = false;
  return res.status(200).send('sucess');
});

module.exports = router;
