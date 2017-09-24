const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./user');

const router = express.Router();

mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });

router.use('/user', userRouter);

module.exports = router;
