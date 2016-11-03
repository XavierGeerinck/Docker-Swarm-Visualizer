import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import * as ModalActions from '../../actions/modal';

const Alert = ({ dispatch, text, handleShowModal }) => (
	<div className="Alert-Container" onClick={(e) => {
			dispatch(ModalActions.showModal('MODAL_ALERT', {
				text: text
			}));
		}}>
		<div className="Alert">!</div>
	</div>
);

export default connect()(Alert);

