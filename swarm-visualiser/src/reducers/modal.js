import { SHOW_MODAL, HIDE_MODAL } from '../constants/ActionTypes';

const initialState = {
	isVisible: false,
	type: null,
	props: {}
};

const swarmNodes = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MODAL:
			return {
				isVisible: true,
				type: action.modal.type,
				props: action.modal.props
			};
		case HIDE_MODAL:
			return initialState;
		default:
			return state;
	}
};

export default swarmNodes;