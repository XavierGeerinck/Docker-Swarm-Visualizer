import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './style.css';
import Swarm from '../../../components/Swarm';
import Modal from '../../../components/Modal';
import { showModal } from '../../../actions/modal';
import MainLayout from '../../layouts/main';

const IndexPage = ({ dispatch, onButtonClick, swarmNodes, containers, modal }) => (
    <MainLayout>
        <Swarm nodes={swarmNodes} containers={containers} />
    </MainLayout>
);

// State to props binding
const mapStateToProps = state => ({
    swarmNodes: state.swarmNodes,
    containers: state.swarmTasks,
    modal: state.modal,
    socketIO: state.socketIO
});

export default connect(
    mapStateToProps
)(IndexPage);
