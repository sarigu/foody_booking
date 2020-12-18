const router = require("express").Router();
const bcrypt = require("bcrypt");
const mysql = require('mysql');

//MYSQL CONNECTION

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root_1234",
    database: "foody",
    port: "3306"
});

//FUNCTIONS
// signup
router.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const sql = "INSERT INTO user (email, password, username) VALUES ( ?,  ?,  ?)";
        await con.query(sql, [req.body.email, hashedPassword, req.body.username], function (err, result) {
            if (result) {
                res.status(200).send();
            }
        });

    } catch{
        res.status(500).send();
    }
})

// login
router.post('/login', async (req, res) => {

    const sql = "SELECT * FROM user WHERE email =  ?";
    await con.query(sql, req.body.email, function (err, result) {
        if (err) {
            res.status(500).send()
        }

        data = JSON.parse(JSON.stringify(result));
        user = data[0];


        if (!user) {
            return res.status(500).send({ error: "User does not exist. Try again." });
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                res.status(200).send("sucess");
            } else {
                res.status(401).send("not allowed");
            }
        });

    })
})

router.get('/logout', (req, res) => {
    console.log('logout clicked');
    return res.status(200).send('Session destroyed');
})


module.exports = router;