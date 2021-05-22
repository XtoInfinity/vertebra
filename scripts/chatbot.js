const { spawn } = require('child_process');
const { get } = require('lodash');
const { PythonShell } = require("python-shell");

const { createError } = require('../controller/error');
const { getLoggerInstance } = require('../helper/logger');
const ERRORCODE = require('../helper/errorcodes');

const logger = getLoggerInstance('scripts/chatbot');

fetchChatbotResponse = (req, res, next) => {
    let question = get(req, ['query', 'question']);
    let dataToSend;
    console.log(question);

    PythonShell.run("./scripts/chatbot.py", { args: [`'~${question}~'`] }, async (err, result) => {
        if (err) throw err;
        const str = result.toString();
        const response = str.substring(str.indexOf("%"), str.length).trim();
        console.log(response);
        // const msg = await switchTag(response, body);
        // if (msg == "DEFAULT") {
        //     body.message.message = "We will get back to you within 12-24 hours";
        //     body.message.sender = body.userTwo;
        //     addMessage(messageId, body, res, true);
        // } else {
        //     body.message.message = msg;
        //     body.message.sender = body.userTwo;
        //     addMessage(messageId, body, res, true);
        // }
        return res.json({
            result: response
        })
    });

    // // spawn new child process to call the python script
    // const python = spawn('python', ['./scripts/chatbot.py', question]);
    // // collect data from script
    // python.stdout.on('data', function (data) {
    //     console.log('Pipe data from python script ...');
    //     dataToSend = data.toString();
    // });
    // // in close event we are sure that stream from child process is closed
    // python.on('close', (code) => {
    //     console.log(`child process close all stdio with code ${code}`);
    //     // send data to browser
    //     console.log(dataToSend)
    //     return res.json({
    //         result: dataToSend
    //     })
    // });

    // python.on('error', (e) => {
    //     logger.error(e);
    //     let err = createError(`Fetching bot response failed`, 500, ERRORCODE.UNKNOWN_ERROR);
    //     return next(err);
    // })

}

module.exports = {
    fetchChatbotResponse
}