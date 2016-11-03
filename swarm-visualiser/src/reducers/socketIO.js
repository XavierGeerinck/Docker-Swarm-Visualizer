import { SOCKET_IO_RECEIVE } from '../constants/ActionTypes';

const initialState = {
	models: {}, // This is an object of container_ids containing the prediction models
	stats: {} // This object contains the cAdvisor raw stats, we use this to visualize everything
};

const socketIO = (state = initialState, action) => {
	switch (action.type) {
		case SOCKET_IO_RECEIVE:
			let newAction = action.data;
			let newState = JSON.parse(JSON.stringify(state));

			switch (action.data.type) {
				case 'MODEL':
					let containerId = newAction.data.container_name.split(".")[2];
					newState.models[containerId] = newAction.data;
					break;
				case 'STATS':
					console.log(newAction.data);
					containerId = newAction.data.container_Name.split(".")[2];
					newState.stats[containerId] = newAction.data;
					break;
				default:
					// Not implemented
			}

			return newState;
		default:
			return state;
	}
};

export default socketIO;