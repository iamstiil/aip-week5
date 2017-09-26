/**
 * Import dependencies
 */
const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./user');

// Create API router
const router = express.Router();

// include user API
router.use('/user', userRouter);

/**
 * Export
 */
module.exports = router;
