import { combineReducers } from 'redux';
import swarmNodes from './swarmNodes';
import swarmTasks from './swarmTasks';

const app = combineReducers({
    swarmNodes,
    swarmTasks
});

export default app;