import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './style.css';
import Swarm from '../../../components/Swarm';
import Modal from '../../../components/Modal';
import { showModal } from '../../../actions/modal';

const IndexPage = ({ dispatch, onButtonClick, swarmNodes, containers, modal }) => (
    <div className="IndexPage">
        <Modal type={modal.type} props={modal.props} /> {/* Modal placeholder, the dispatcher will take care of this */}

        <div className="IndexPage-Header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Docker Swarm Visualiser</h2>
        </div>
        <div className="IndexPage-Content">
            <Swarm nodes={swarmNodes} containers={containers} />
        </div>
        <div className="IndexPage-Footer">
            Craftsmanship &#9874; and &hearts; by Xavier Geerinck
        </div>
    </div>
);

// State to props binding
const mapStateToProps = state => ({
    swarmNodes: state.swarmNodes,
    containers: state.swarmTasks,
    modal: state.modal
});

export default connect(
    mapStateToProps
)(IndexPage);
