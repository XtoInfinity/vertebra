const express = require('express');

const { addBugRequest, getAllBugs, updateBugStatus } = require('../controller/bug');
const { errorHandler } = require('../controller/error');

const router = express.Router();

/*
 * List all minor routes here
*/
router.post('/', addBugRequest, errorHandler);

router.get('/all', getAllBugs, errorHandler);

router.put('/updateStatus', updateBugStatus, errorHandler);

module.exports = router;