import { SOCKET_IO_RECEIVE } from '../constants/ActionTypes';

const initialState = {
	alerts: {} // This is an object of container_ids containing the data
};

const socketIO = (state = initialState, action) => {
	switch (action.type) {
		case SOCKET_IO_RECEIVE:
			let newAction = action.data;
			let containerId = newAction.data.container_name.split(".")[2];
			let newState = JSON.parse(JSON.stringify(state));

			switch (action.data.type) {
				case 'ALERT':
					newState.alerts[containerId] = newAction.data;
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