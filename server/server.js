/**
 * Import dependencies
 */
const express = require('express');
const apiRouter = require('./api-router');
const authRouter = require('./auth-router');

// Initialize express app
const app = express();

// Add middleware to allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.send(200);
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

// Serve
app.listen(8080, () => {
  console.log('Listening on port 8080');
});
