const express = require('express');

const { fetchChatbotResponse } = require('../scripts/chatbot');
const { errorHandler } = require('../controller/error');

const router = express.Router();

/*
 * List all minor routes here
*/
router.get('/response', fetchChatbotResponse, errorHandler);

module.exports = router;