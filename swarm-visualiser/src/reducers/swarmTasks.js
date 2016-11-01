import { RECEIVE_TASKS } from '../constants/ActionTypes';

const swarmTasks = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_TASKS:
            return action.tasks;
        default:
            return state;
    }
};

export default swarmTasks;