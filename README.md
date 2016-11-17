# Introduction
This is the complete recode of the Docker Swarm Visualiser as initially created by https://github.com/ManoMarks/docker-swarm-visualizer. There were several reasons that contributed to creating this recode:
* A more extensible project that uses components and different pages
* For my thesis, Socket.IO had to be built in and other changes such as the support for statistics were needed
* The initial project by ManoMarks was hard to setup, this new recode uses a proxy server created in node that can easily be started and changed.

# Setup
## Setting up the Proxy Server
The Frontend application uses a proxy connection to connect to the Docker container where our Swarm Cluster is running. To get this server working follow these steps

1. Navigate to the `docker-api` directory
2. Run `npm install` (or `yarn` if yarn is installed)
3. Run `sudo node index.js` on one of the Leader nodes

> You can change the port where the proxy is listening on by setting the `WEB_PORT` environment. Example: `sudo WEB_PORT=5000 node index.js`

## Setting up the Frontend
The Frontend application itself is created in React and Redux, so running it in development are a few easy steps:

1. Navigate to the `swarm-visualiser` directory
2. Run `npm install` (or `yarn` if yarn is installed)
3. Run `npm start` and the development page will load together with the Docker Swarm

> You can change the configurations such as the location of the swarm in the `swarm-visualiser/src/config` directory.
