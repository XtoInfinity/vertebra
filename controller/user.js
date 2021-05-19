let { createUser } = require('../db/queries');
const { getLoggerInstance } = require('../helper/logger');

const logger = getLoggerInstance('controllers/user');

addUser = async (req, res, next) => {
    let instance = req.body;

    try {
        let newUser = await createUser(instance);
        logger.info("New user created successfully");
    } catch (e) {
        logger.error(e);
        let err = createError(`User Creation failed`, 500, ERRORCODE.UNKNOWN_ERROR);
        return next(err);
    }

    return res.json({
        result: "New user created successfully"
    });
}


module.exports = {
    addUser
}