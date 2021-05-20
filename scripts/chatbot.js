const { spawn } = require('child_process');
const { get } = require('lodash');

const { createError } = require('../controller/error');
const { getLoggerInstance } = require('../helper/logger');

const logger = getLoggerInstance('scripts/chatbot');

fetchChatbotResponse = (req, res, next) => {
    let question = get(req, ['query', 'question']);
    let dataToSend;
    console.log(question);

    // spawn new child process to call the python script
    const python = spawn('python', ['./scripts/chatbot.py', question]);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        console.log(dataToSend)
        return res.json({
            result: dataToSend
        })
    });

    python.on('error', (e) => {
        logger.error(e);
        let err = createError(`Fetching bot response failed`, 500, ERRORCODE.UNKNOWN_ERROR);
        return next(err);
    })

}

module.exports = {
    fetchChatbotResponse
}