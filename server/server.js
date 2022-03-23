const express = require('express');
const app = express();
const path = require('path');

// import routers
const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login');
const feedRouter = require('./routes/feed.js');
const edithabitRouter = require('./routes/edithabit');
// const calendarRouter = require('./routes/calendar');

const cors = require('cors');
const port = 3000;

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('bundle'));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, 'bundle/index.html'));
});

// Define Routes Handler
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/feed', feedRouter);
app.use('/edithabit', edithabitRouter);

// Unknown route handler
app.use((req, res) => res.status(404).send('You are in the wrong place! 😡'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

// app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app.listen(port, () => console.log(`App listening on port ${port}`));