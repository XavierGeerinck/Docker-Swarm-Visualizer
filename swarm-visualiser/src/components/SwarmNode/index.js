import React, { PropTypes } from 'react';
import './style.css';
import SwarmNodeContainer from '../SwarmNodeContainer';

const SwarmNode = ({ node, containers }) => (
    <div className="SwarmNode">
        <div className="SwarmNode-Header">
            <h1>{node.Description.Hostname}</h1>
            <h2>{node.Spec.Role}</h2>
            <p>{Math.round(node.Description.Resources.MemoryBytes / 1024 / 1024 / 1024)}Gb RAM</p>
        </div>

        <div className="SwarmNode-Containers">
            {containers.map(c => <SwarmNodeContainer container={c} color="black" /> )}
        </div>
    </div>
);

SwarmNode.propTypes = {
    node: PropTypes.shape({
        CreatedAt: PropTypes.string.isRequired,
        ID: PropTypes.string.isRequired,
        Spec: PropTypes.shape({
            Role: PropTypes.string.isRequired,
            Availability: PropTypes.string.isRequired
        }),
        Description: PropTypes.shape({
            Hostname: PropTypes.string.isRequired,
            Platform: PropTypes.shape({
                Architecture: PropTypes.string.isRequired,
                OS: PropTypes.string.isRequired
            }),
            Resources: PropTypes.shape({
                NanoCPUs: PropTypes.number.isRequired,
                MemoryBytes: PropTypes.number.isRequired
            }),
            Engine: PropTypes.shape({
                EngineVersion: PropTypes.string.isRequired,
                Plugins: PropTypes.arrayOf(PropTypes.shape({
                    Type: PropTypes.string.isRequired,
                    Name: PropTypes.string.isRequired
                }))
            })
        }),
        Status: PropTypes.shape({
            state: PropTypes.string.isRequired
        }),
        UpdatedAt: PropTypes.string.isRequired,
        Version: PropTypes.shape({
            name: PropTypes.string.isRequired,
            isOnline: PropTypes.bool.isRequired
        })
    }).isRequired
};

export default SwarmNode;
