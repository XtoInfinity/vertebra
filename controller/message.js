const { get } = require('lodash');

let { createMessage } = require('../db/queries');
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


module.exports = {
    addMessage
}