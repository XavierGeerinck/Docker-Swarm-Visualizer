import React, { PropTypes, Component } from 'react';
import './style.css';
import { connect } from 'react-redux';

import ModalAlert from '../ModalAlert';

const ModalTypes = {
	'MODAL_ALERT': ModalAlert
};

const Modal = ({ type, props }) => {
	if (!type) {
		return null;
	}

	const SpecificModal = ModalTypes[type];
	return <SpecificModal {...props} />;
};


Modal.propTypes = {
	type: PropTypes.string,
	props: PropTypes.object
};

export default connect(
	state => state.modal
)(Modal);