import * as types from '../constants/ActionTypes';

export const showModal = (type, props) => {
	return {
		type: types.SHOW_MODAL,
		modal: {
			type: type,
			props: props
		}
	}
};

export const hideModal = () => {
	return {
		type: types.HIDE_MODAL
	};
};