const { get } = require('lodash');

const { createBug, fetchBugsForApp, updateBugStatusById } = require('../db/queries');
const { getLoggerInstance } = require('../helper/logger');
const { createError } = require('../controller/error');

const logger = getLoggerInstance('controllers/bug');

addBugRequest = async (req, res, next) => {
    let instance = req.body;

    try {
        newExam = await createBug(instance);
        logger.info("New bug request created successfully");
    } catch (e) {
        logger.error(e);
        let err = createError(`Bug Creation failed`, 500, ERRORCODE.UNKNOWN_ERROR);
        return next(err);
    }

    return res.json({
        result: "New bug request created successfully"
    });
}

getAllBugs = async (req, res, next) => {
    let appId = get(req, ['query', 'appId']);
    let bugList = [];
    try {
        bugList = await fetchBugsForApp(appId);
        logger.info(`All bugs for App ${appId} fetched successfully`);
    } catch (e) {
        logger.error(e);
        let err = createError(`Bug Fetch failed for App ${appId}`, 500, ERRORCODE.UNKNOWN_ERROR);
        return next(err);
    }

    return res.json({
        result: bugList
    });
}

updateBugStatus = async (req, res, next) => {
    let bugId = get(req, ['body', 'bugId']);
    let status = get(req, ['body', 'status']);
    try {
        bugInstance = await updateBugStatusById(bugId, status);
    } catch (e) {
        logger.error(e);
        let err = createError(`Bug status Update failed`, 500, ERRORCODE.UNKNOWN_ERROR);
        return next(err);
    }

    return res.json({
        result: "Bug status update successful"
    });
}

module.exports = {
    addBugRequest,
    getAllBugs,
    updateBugStatus
}