const express = require('express');

const { addMessage, getAllMessages } = require('../controller/message');
const { errorHandler } = require('../controller/error');

const router = express.Router();

/*
 * List all minor routes here
*/
router.post('/', addMessage, errorHandler);

router.get('/all', getAllMessages, errorHandler);

module.exports = router;