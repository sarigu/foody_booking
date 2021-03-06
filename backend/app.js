const express = require('express');

const app = express();
const rateLimiter = require('express-rate-limit');
const cors = require('cors');

//const authRoute = require('./routes/auth');
const bookingRoute = require('./routes/booking');

//  MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  rateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 200,
  }),
);

app.use(
  '/auth/',
  rateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 20,
  }),
);

app.use('/auth', bookingRoute);
app.use('/', bookingRoute);

//  RUN SERVER
const port = 8000;

app.listen(port, () => {
  console.log('Server is running on port ', port);
});
