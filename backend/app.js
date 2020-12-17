const express = require("express");
const app = express();
const mysql = require('mysql');
const bcrypt = require("bcrypt");
const session = require('express-session');


//  MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: "sas546ddasd546asd34asd",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}))

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

// --------signup

app.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const sql = "INSERT INTO user (email, password, username) VALUES ( ?,  ?,  ?)";
        await con.query(sql, [req.body.email, hashedPassword, req.body.username], function (err, result) {
            if (err) {
                res.status(500).send()
            }
        });

    } catch{
        res.status(500).send();
    }
})

//-------- login
app.post('/login', async (req, res) => {

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
                req.session.username = user.username;
                res.status(200).send("sucess");
            } else {
                res.status(401).send("not allowed");
            }
        });

    })
})


// ----------- session

app.get('/getsession', (req, res) => {
    console.log("request");
    console.log(req.session);
    console.log(req.session.username);
    if (!req.session.username) {
        return res.status(401).send();
    }
    return res.status(200).send('Welcome to session with key');
})


// ------- get menu
app.get("/menu", (req, res) => {
    con.query("SELECT * FROM Menu WHERE RestaurantID = 1", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        return res.send({ data: data });
    });
});

// -------- get one random menu item
app.get("/recommendation", (req, res) => {
    con.query("SELECT * FROM Menu ORDER BY RAND() LIMIT 1", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        return res.send({ data: data });
    });
});

// -------- get resturant data
app.get("/restaurantdetails", (req, res) => {
    con.query("SELECT * FROM Restaurant", function (err, result) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        return res.send({ data: data });
    });
});

// -------- update resturant data
app.post("/restaurantdetails", async (req, res) => {
    const { name, address, description, email, phone } = req.body;
    const sql = "UPDATE Restaurant SET name = ?, address = ?, description = ?, email = ? , phone = ?  WHERE RestaurantID = 1";
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
