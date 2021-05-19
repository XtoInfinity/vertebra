const express = require('express');

const { addInstance } = require('../controller/instance');

const router = express.Router();

/*
 * List all minor routes here
*/
router.post('/', addInstance);

module.exports = router;