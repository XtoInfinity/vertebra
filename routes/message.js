const express = require('express');

const { addMessage } = require('../controller/message');
const { errorHandler } = require('../controller/error');

const router = express.Router();

/*
 * List all minor routes here
*/
router.post('/', addMessage, errorHandler);

module.exports = router;