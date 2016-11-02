import React, { PropTypes } from 'react';
import './style.css';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { hideModal } from '../../actions/modal';

const ModalAlert = ({ dispatch, text, handleCloseModal }) => (
	<div className="ModalAlert">
		<Modal className="ModalAlert-Modal"
		       overlayClassName="ModalAlert-ModalOverlay"
		       isOpen={true} onRequestClose={handleCloseModal}>
			<h1>Alert</h1>
			<p>{text}</p>
			<button onClick={handleCloseModal}>Close</button>
		</Modal>
	</div>
);


ModalAlert.propTypes = {
	text: PropTypes.string
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
	return {
		handleCloseModal: (e) => {
			e.preventDefault();
			dispatch(hideModal());
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ModalAlert);