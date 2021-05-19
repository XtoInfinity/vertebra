const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config(); // Making all the constants available in process.env

let app = express();

let sess = {
    secret: 'CHANGE THIS TO A RANDOM SECRET',
    cookie: {
        maxAge: (7 * 24 * 3600 * 1000),
        // secure: true
    },
    resave: false,
    saveUninitialized: true,
};

/* Import all necessary routes here */
let instanceRouter = require('./routes/instance');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        /* Change the subdomain */
        if (!(origin.match(".aprendo.school") || origin.match("localhost"))) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Authentication
app.use(session(sess));

// API Routes
/*
 * List all API routes here
*/
app.use('/api/instance', instanceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;