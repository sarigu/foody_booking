const router = require('express').Router();
const bcrypt = require('bcrypt');
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

function checkUser(email, res) {
  const sql = `SELECT * FROM user WHERE email=?`;
  con.query(sql, [email], (error, results) => {
    if (error) throw error;
    const [user] = results;
    if (user) {
      console.log("user exists");
      res.status(400).send({ message: 'User already exists' });
    }
  });
}

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
  const sql = `SELECT * FROM user WHERE email = ?`;
  if (email && password) {
    con.query(sql, [email], (error, results) => {
      if (error) throw error;
      const [user] = results;
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (!result) {
            return res.status(500).send({ error: "Password. Try again." });
          }
        });
      } else {
        return res.status(500).send({ error: "User does not exist. Try again." });
      }
      return res.status(200).send();
    });
  }
});

router.get("/setsession", (req, res) => {
  console.log("set");
  req.session.secretMessage = "secret message oder so";
  return res.send({ data: req.session });
});


router.get('/logout', (req, res) => {
  console.log('logout clicked');
  req.session.destroy();
  return res.status(200).send('sucess');
});

router.get("/getsession", (req, res) => {
  console.log("get");
  console.log(req.session);
  //console.log(req.session.secretMessage);
  return res.send({ data: req.session });
});

module.exports = router;
