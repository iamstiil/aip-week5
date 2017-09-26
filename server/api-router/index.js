/**
 * Import dependencies
 */
const express = require('express');
const userRouter = require('./user');
const taskRouter = require('./task');

// Create API router
const router = express.Router();

// include user API
router.use('/user', userRouter);
// include task API
router.use('/task', userRouter);

/**
 * Export
 */
module.exports = router;
