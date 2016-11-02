import { combineReducers } from 'redux';
import swarmNodes from './swarmNodes';
import swarmTasks from './swarmTasks';
import modal from './modal';

const app = combineReducers({
    swarmNodes,
    swarmTasks,
    modal
});

export default app;