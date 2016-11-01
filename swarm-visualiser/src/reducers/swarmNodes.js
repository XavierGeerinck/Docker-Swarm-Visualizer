import { RECEIVE_SWARM_NODES } from '../constants/ActionTypes';

const swarmNodes = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_SWARM_NODES:
            return action.nodes;
        default:
            return state;
    }
};

export default swarmNodes;