import { combineReducers } from 'redux';
import swarmNodes from './swarmNodes';
import swarmTasks from './swarmTasks';
import modal from './modal';
import socketIO from './socketIO';

const app = {
    swarmNodes,
    swarmTasks,
    modal,
    socketIO
};

export default app;