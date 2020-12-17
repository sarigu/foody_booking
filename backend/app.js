const express = require("express");
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const rateLimiter = require("express-rate-limit");


const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");


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

app.use(
    rateLimiter({
        windowMs: 10 * 60 * 1000,
        max: 200,
    })
);

app.use(
    "/auth/",
    rateLimiter({
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 10,
    })
);

app.use("/auth", authRoute);
app.use("/", userRoute);


//  RUN SERVER
const port = 8000;

app.listen(port, () => {
    console.log("Server is running on port ", port);
});
