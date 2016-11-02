import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import * as ModalActions from '../../actions/modal';

const Alert = ({ handleShowModal }) => (
	<div className="Alert-Container" onClick={handleShowModal}>
		<div className="Alert">!</div>
	</div>
);

const mapDispatchToProps = dispatch => {
	return {
		handleShowModal: (e) => {
			dispatch(ModalActions.showModal('MODAL_ALERT', {
				text: 'Expect container TODO to hit bottleneck at TODO with a calculated regression of TODO'
			}));
		}
	}
};

export default connect(null, mapDispatchToProps)(Alert);

