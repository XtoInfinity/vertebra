let { createInstance } = require('../db/queries');
const { getLoggerInstance } = require('../helper/logger');

const logger = getLoggerInstance('controllers/user');

addInstance = async (req, res, next) => {
    let instance = req.body;

    try {
        newExam = await createInstance(instance);
        logger.info("New instance created successfully");
    } catch (e) {
        logger.error(e);
        let err = createError(`instance Creation failed`, 500, ERRORCODE.UNKNOWN_ERROR);
        return next(err);
    }

    return res.json({
        result: "New instance created successfully"
    });
}


module.exports = {
    addInstance
}