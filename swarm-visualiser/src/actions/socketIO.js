import * as types from '../constants/ActionTypes';

export const receiveSocketData = (data) => {
	return {
		type: types.SOCKET_IO_RECEIVE,
		data: data
	}
};