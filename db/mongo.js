const mongoose = require('mongoose');

const { getLoggerInstance } = require('../helper/logger');

const logger = getLoggerInstance('db/mongo');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

console.log(`Uri ${uri}`);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    useFindAndModify: false,
    poolSize: 10
};

connectMongoose = async () => {
    await mongoose.connect(uri, options);

    mongoose.connection.on('connected', function () {
        logger.info(`Mongoose default connection is open to ${uri}`);
    });

    mongoose.connection.on('error', function (err) {
        logger.info("Mongoose default connection has occured " + err + " error");
    });

    mongoose.connection.on('disconnected', function () {
        logger.info("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            logger.info("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });

    // Define create indexes over here
}

module.exports = {
    connectMongoose
}