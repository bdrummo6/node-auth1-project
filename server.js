const express = require('express');

const server = express();

const welcomeRouter = require('./api/welcome/welcome-router');
const usersRouter = require('./api/users/users-router');

server.use(express.json());

server.use('/api', welcomeRouter);
server.use('/api', usersRouter);

module.exports = server;