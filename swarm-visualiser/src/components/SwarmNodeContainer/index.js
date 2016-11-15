import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import Alert from '../Alert';
import { browserHistory } from 'react-router';

const SwarmNodeContainer = ({ container, socketIO }) => {
    const model = socketIO.models[container.ID];
    let error = null;

    if (model) {
        let regression = `${model.model_slope}*x + ${model.model_intercept}`;
        let calculatedBottleneck = 0.0; // TODO
        error = `Expected container to hit bottleneck at ${new Date()} with calculated regression ${regression}`;
    }

    return (
        <div className="SwarmNodeContainer" onClick={(e) => {
            browserHistory.push(`/container/${container.ID}`);
        }}>
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
