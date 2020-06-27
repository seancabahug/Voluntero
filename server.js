require('dotenv').config();

// Require all dependencies
const express = require('express');
const http = require('http');
const helmet = require('helmet')
const morgan = require('morgan');
const mongoose = require('mongoose');

// Set up our app
const app = express();
const server = http.Server(app);

// Initializes the port and the url
const url = process.env.MONGODB_URL;
const port = 8080;

// Require a custom made logger
const logger = require('./utilities/Logger.js')

app.use(morgan("dev"));
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((res, req, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POSTS, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/*
 * Routes
 */

const apiRoute = require('./routes/api.route');

app.use('/api', apiRoute)

app.use('/', express.static(__dirname + '/frontend/build'));

app.get('/a', (request, response) => {
    response.sendFile(__dirname + '/requestFile.html');
})

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

server.listen(port, () => {
    logger.log(`New HTTP server created on localhost:${port}!`);
});