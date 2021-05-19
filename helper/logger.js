const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const getLoggerInstance = (filename) => {
    return createLogger({
        level: 'info',
        format: combine(
            label({ label: filename }),
            timestamp(),
            myFormat
        ),
        defaultMeta: { service: 'm3tamorph' },
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new transports.File({ filename: 'error.log', level: 'error' }),
            new transports.File({ filename: 'combined.log' }),
        ],
    });
}

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    // logger.add(new transports.Console({
    //   format: format.simple(),
    // }));
}

module.exports = {
    getLoggerInstance
};