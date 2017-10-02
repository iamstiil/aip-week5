/**
 * Import dependencies
 */
const express = require('express');
const taskRouter = require('./task');
const userRouter = require('./user');

// Create API router
const router = express.Router();

// include task API
router.use('/task', taskRouter);
// include user API
router.use('/user', userRouter);

/**
 * Export
 */
module.exports = router;
