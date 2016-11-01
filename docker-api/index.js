const http = require('http');
const httpProxy = require('http-proxy');
const cors = require('cors');
const express = require('express');
const server = express();

// Middlewares
server.use(cors());

//
// A simple proxy server that forwards requests to our docker daemon
//
let target = {};

if (process.env.DOCKER_HOST) {
    target = process.env.DOCKER_HOST;
} else {
    target.socketPath = '/var/run/docker.sock';
}

const proxy = httpProxy.createProxyServer({
    target: target
});

server.use('/api', (request, response) => {
    proxy.web(request, response);
});

server.listen(process.env.WEB_PORT || 8080, () => {
    console.log(`Listening on ${process.env.WEB_PORT || 8080}`)
});