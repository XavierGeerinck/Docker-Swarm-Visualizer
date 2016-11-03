import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import Alert from '../Alert';

const SwarmNodeContainer = ({ container, socketIO }) => {
    const alert = socketIO.alerts[container.ID];
console.log(socketIO);
    let error = null;

    console.log(alert);
    if (alert) {
        let regression = `${alert.model_slope}*x + ${alert.model_intercept}`;
        let calculatedBottleneck = 0.0; // TODO
        error = `Expected container to hit bottleneck at ${new Date()} with calculated regression ${regression}`;
    }

    return (
        <div className="SwarmNodeContainer">
            <div className={`SwarmNodeContainer-Header-Status-${container.Status.State}`}></div>

            <div className="SwarmNodeContainer-Header">
                <h1>{container.Spec.ContainerSpec.Image}</h1>
                {/*<p>Reserved Memory: {container.Spec.Resources.Reservations.MemoryBytes / 1024 / 1024 / 1024}Gb</p>*/}
                { error ? <Alert text={error} /> : null }
            </div>
        </div>
    );
};

SwarmNodeContainer.propTypes = {

};

const mapStateToProps = state => ({
    socketIO: state.socketIO
});

export default connect(mapStateToProps)(SwarmNodeContainer);
