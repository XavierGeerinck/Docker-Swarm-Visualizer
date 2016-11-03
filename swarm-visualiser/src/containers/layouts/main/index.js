import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './style.css';
import Modal from '../../../components/Modal';

const MainLayout = ({ children, modal }) => (
    <div className="MainLayout">
        <Modal type={modal.type} props={modal.props} /> {/* Modal placeholder, the dispatcher will take care of this */}

        <div className="MainLayout-Header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Docker Swarm Visualiser</h2>
        </div>
        <div className="MainLayout-Content">
            {children}
        </div>
        <div className="MainLayout-Footer">
            Craftsmanship &#9874; and &hearts; by Xavier Geerinck
        </div>
    </div>
);

// State to props binding
const mapStateToProps = state => ({
    modal: state.modal
});

export default connect(
    mapStateToProps
)(MainLayout);
