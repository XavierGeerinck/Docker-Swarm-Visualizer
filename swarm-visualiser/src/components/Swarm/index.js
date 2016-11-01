import React, { PropTypes } from 'react';
import './style.css';
import SwarmNode from '../SwarmNode';

const Swarm = ({ nodes, containers }) => (
    <div className="Swarm">
        {nodes.map(sn => <SwarmNode node={sn} containers={containers.filter(c => c.NodeID == sn.ID)} /> )}
    </div>
);

Swarm.propTypes = {
    containers: PropTypes.arrayOf(PropTypes.shape({
        ID: PropTypes.string.isRequired,
        Version: PropTypes.shape({
            Index: PropTypes.number.isRequired
        }),
        CreatedAt: PropTypes.string.isRequired,
        UpdatedAt: PropTypes.string.isRequired,
        Spec: PropTypes.shape({
            ContainerSpec: PropTypes.shape({
            }),
            Resources: PropTypes.shape({
            }),
            RestartPolicy: PropTypes.shape({
            }),
            Placement: PropTypes.shape({
            }),
        }),
        ServiceID: PropTypes.string.isRequired,
        Slot: PropTypes.number,
        NodeID: PropTypes.string.isRequired,
        Status: PropTypes.shape({
            Timestamp: PropTypes.string.isRequired,
            State: PropTypes.string.isRequired,
            Message: PropTypes.string.isRequired,
            ContainerStatus: PropTypes.shape({
                ContainerID: PropTypes.string.isRequired,
                PID: PropTypes.number.isRequired
            })
        }),
        DesiredState: PropTypes.string.isRequired,
        NetworksAttachments: PropTypes.arrayOf(PropTypes.shape({
        }))
    })).isRequired,
    nodes: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired
};

export default Swarm;
