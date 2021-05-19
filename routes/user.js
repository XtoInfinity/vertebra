const express = require('express');

const { addUser } = require('../controller/user');
const { errorHandler } = require('../controller/error');

const router = express.Router();

/*
 * List all minor routes here
*/
router.post('/', addUser, errorHandler);

module.exports = router;