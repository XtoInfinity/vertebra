let { get, set } = require('lodash');

errorHandler = (err, req, res, next) => {
    let status = get(err, ['status'], 500);

    let error = get(err, ['message'], 'Something went wrong');

    let code = get(err, ['code'], 'UNIDENDIFIED_ERROR');

    let result = {
        error,
        code
    }

    res.status(status).end(JSON.stringify(result));
}

createError = (message, status, code) => {
    let err = new Error(message);
    set(err, 'status', status);
    set(err, 'code', code);
    return err;
}

module.exports = {
    errorHandler,
    createError
}