const { get } = require('lodash');

let { createMessage, fetchMessagesForUser } = require('../db/queries');
const { getLoggerInstance } = require('../helper/logger');

const logger = getLoggerInstance('controllers/message');

addMessage = async (req, res, next) => {
    let messageInstance = get(req, ['body']);

    try {
        let newMessage = await createMessage(messageInstance);
        logger.info("New message created successfully");
    } catch (e) {
        logger.error(e);
        let err = createError(`Message Creation failed`, 500, ERRORCODE.UNKNOWN_ERROR);
        return next(err);
    }

    return res.json({
        result: "New message created successfully"
    });
}

getAllMessages = async (req, res, next) => {
    let userId = get(req, ['query', 'userId']);
    let messageList = [];
    try {
        messageList = await fetchMessagesForUser(userId);
        logger.info(`All messages for User ${userId} fetched successfully`);
    } catch (e) {
        logger.error(e);
        let err = createError(`Messages Fetch failed for user ${userId}`, 500, ERRORCODE.UNKNOWN_ERROR);
        return next(err);
    }

    return res.json({
        result: messageList
    });
}

module.exports = {
    addMessage,
    getAllMessages
}