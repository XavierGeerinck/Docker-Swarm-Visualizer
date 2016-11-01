# About
This server creates a proxy to the Docker REST API, which makes it to perform calls to it and manage it remotely.

# Installation
1. `npm install`
2. start server through: `sudo node index.js`

The default webport is `8080` but can be changed by setting the environment variable `WEB_PORT`. Example: `sudo WEB_PORT=5000 node index.js`

> Note: This API should NEVER be made public, since it can modify running containers. Make sure that you know who is accessing it.