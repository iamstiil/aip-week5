const express = require('express');
const app = express();
const apiRouter = require('./router');

app.use(express.static('build'));
app.use('/api', apiRouter);

app.listen(8080, () => {
  console.log('Listening on port 8080');
});