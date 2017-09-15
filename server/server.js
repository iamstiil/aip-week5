const express = require('express');
const app = express();
const apiRouter = require('./api-router');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', apiRouter);
app.use(express.static('build'));

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
