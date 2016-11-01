import * as docker from '../api/docker';
import * as types from '../constants/ActionTypes';

const receiveSwarmNodes = nodes => ({
    type: types.RECEIVE_SWARM_NODES,
    nodes: nodes
});

const receiveTasks = tasks => ({
    type: types.RECEIVE_TASKS,
    tasks: tasks
});

export const getAllContainers = () => dispatch => {
    docker.getRunningTasks(tasks => {
        dispatch(receiveTasks(tasks));
    });
};

export const getAllSwarmNodes = () => dispatch => {
    docker.getSwarmNodes(nodes => {
        dispatch(receiveSwarmNodes(nodes));
    });
};