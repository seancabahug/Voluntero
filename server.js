require('dotenv').config();

// Require all dependencies
const express = require('express');
const http = require('http');
const helmet = require('helmet')
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const server = http.Server(app);

// Initializes the port and the url
const url = `cool url here`;
const port = 8080;

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

/* mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }); */

server.listen(port, () => {
    console.log("Server running on " + port);
});