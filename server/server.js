/**
 * Import dependencies
 */
const express = require('express');
const path = require('path');
const apiRouter = require('./api-router');
const authRouter = require('./auth-router');
const constants = require('../src/constants');

// Initialize express app
const app = express();

// Add middleware to allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://localhost:3000, http://${constants.appUrl}`);
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Add authentication router
app.use('/auth', authRouter);
// Add API router
app.use('/api', apiRouter);
// Add built react frontend
app.use(express.static('build'));
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../build/index.html');
});

// Serve
app.listen(constants.appPort, () => {
  console.log('Listening on port ' + constants.appPort);
});
