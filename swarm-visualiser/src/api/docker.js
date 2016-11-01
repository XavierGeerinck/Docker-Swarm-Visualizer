// Mock nodes
import _nodes from './docker_nodes.json';
import config from '../config';

export const getSwarmNodes = (callback) => {
    fetch(`${config.docker_host_api}/nodes`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        return callback(json);
    });
};

export const getRunningTasks = (callback) => {
    let filters = {
        "desired-state": [ "running" ]
    };

    fetch(`${config.docker_host_api}/tasks?filters=${JSON.stringify(filters)}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        return callback(json);
    });
};