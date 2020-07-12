const express = require('express');

const server = express();

const welcomeRouter = require('./api/welcome/welcome-router');

server.use(express.json());

server.use('/api', welcomeRouter);

module.exports = server;