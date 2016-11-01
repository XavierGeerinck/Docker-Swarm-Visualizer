import React from 'react';
import './style.css';

const SwarmNodeContainer = ({ container }) => (
    <div className="SwarmNodeContainer">
        <div className={`SwarmNodeContainer-Header-Status-${container.Status.State}`}></div>

        <div className="SwarmNodeContainer-Header">
            <h1>{container.Spec.ContainerSpec.Image}</h1>
            {/*<p>Reserved Memory: {container.Spec.Resources.Reservations.MemoryBytes / 1024 / 1024 / 1024}Gb</p>*/}
        </div>
    </div>
);

SwarmNodeContainer.propTypes = {

};

export default SwarmNodeContainer;
