import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './style.css';
import Swarm from '../../components/Swarm';

const IndexPage = ({ swarmNodes, containers }) => (
    <div className="IndexPage">
        <div className="IndexPage-Header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Docker Swarm Visualiser</h2>
        </div>
        <div className="IndexPage-Content">
            <Swarm nodes={swarmNodes} containers={containers} />
        </div>
        <div className="IndexPage-Footer">

        </div>
    </div>
);

const mapStateToProps = state => ({
    swarmNodes: state.swarmNodes,
    containers: state.swarmTasks
});

export default connect(
    mapStateToProps,
    { } // Actions that can be performed and should be passed here
)(IndexPage);
