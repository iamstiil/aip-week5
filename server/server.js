const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('build'));

app.listen(8080);