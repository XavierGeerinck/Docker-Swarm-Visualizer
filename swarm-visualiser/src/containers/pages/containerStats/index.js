import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import MainLayout from '../../layouts/main';
import Chart from 'chart.js';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';

class ContainerStatsPage extends Component {
    constructor() {
        super();
        this.pointsStatistics = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        this.pointsModel = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ];
        this.pointsThreshold = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ];

        this.state = {
            threshold: 3 * 1024
        };

        this.socket = io('http://127.0.0.1:5001');
        // let socket = io('http://10.48.98.232:5001');
        this.socket.on('connect', () => {
            console.log('connected');
        });

        this.socket.on('disconnect', () => {
            console.log('disconnected');
        });

        this.models = {};
        this.stats = {};
    }

    componentDidMount() {
        this.socket.on('data', (data) => {
            switch (data.type) {
                case 'MODEL':
                    let containerId = data.data.container_name.split(".")[2];
                    this.models[containerId] = data.data;
                    break;
                case 'STATS':
                    containerId = data.data.container_Name.split(".")[2];
                    this.stats[containerId] = data.data;
                    break;
                default:
                // Not implemented
            }

            this.updateStats();
        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
        this.socket = undefined;
    }

    // After render, init the chart
    componentDidUpdate() {
        this.updateStats();
    }

    updateStats() {
        var ctx = document.getElementById("chart");

        if (!ctx) {
            return;
        }

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [ '', '', '', '', '', '', '', '', '', '' ],
                datasets: [
                    {
                        label: 'RAM Usage',
                        data: this.pointsStatistics,
                        backgroundColor: undefined,
                        borderColor: "rgba(66, 139, 202, 1)"
                    },
                    {
                        label: 'Predicted RAM Usage',
                        data: this.pointsModel,
                        backgroundColor: undefined,
                        borderColor: "rgba(217, 83, 79, 1)"
                    },
                    {
                        label: 'Threshold',
                        data: this.pointsThreshold,
                        backgroundColor: undefined,
                        borderColor: "rgba(255, 255, 255, 1)"
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false
            }
        });

        const stats = this.stats[this.props.containerId];
        const model = this.models[this.props.containerId];


        // Push the container statistic and cap them at 10 points
        if (stats) {
            //stats.container_stats.memory.usage | stats.container_stats.cpu.usage.total
            this.pointsStatistics.push(stats.container_stats.memory.usage / 1024 / 1024);
            this.pointsStatistics = this.pointsStatistics.splice(1, 10);
            myChart.data.datasets[0].data = this.pointsStatistics;
        }

        // Push the container predictions and cap them at 10 points
        if (model) {
            let regression = `${model.model_slope} * x + ${model.model_intercept}`;
            console.log(regression);

            let y = model.model_slope * ((new Date()).getTime() / 1000) + model.model_intercept;
            y /= 1024; // To kb
            y /= 1024; // To Mb
            this.pointsModel.push(y);
            this.pointsModel = this.pointsModel.splice(1, 10);
            myChart.data.datasets[1].data = this.pointsModel;
        }

        // Push the threshold
        this.pointsThreshold.push(this.state.threshold);
        this.pointsThreshold = this.pointsThreshold.splice(1, 10);
        myChart.data.datasets[2].data = this.pointsThreshold;

        // Refresh the graph
        myChart.update();

        // Set new prediction, note that this also happens with a javascript dom change since else we need to rerender everything
        // Formula: (threshold - model_intercept) / model_slope
        if (model) {
            console.log(this.state.threshold);
            let thresholdBytes = this.state.threshold * 1024 * 1024; // Threshold in bytes
            let predictedX = (thresholdBytes - model.model_intercept) / model.model_slope;
            document.querySelector('#predicted-time').innerHTML = new Date(predictedX * 1000).toString();
            console.log(new Date(predictedX * 1000).toString());
        }
    }

    handleThresholdChange(e) {
        this.setState({
            threshold: e.target.value
        });
    }

    render() {
        let task = this.props.containers.filter(c => c.ID == this.props.containerId)[0];
        let threshold = this.state.threshold;

        if (!task) {
            return null;
        }

        return (
            <MainLayout>
                <button className="ContainerStats-Button-GoBack" onClick={(e) => {
                    browserHistory.push(`/`);
                }}>&lt; Go Back</button>

                {task.Spec.ContainerSpec.Image}<br />
                {task.Status.State}<br />
                {task.Status.ContainerStatus.ContainerID}<br />
                {task.Spec.ContainerSpec.Args ? task.Spec.ContainerSpec.Args.join(" ") : null}

                <div>
                    <label for="threshold">Threshold (in Mb):</label>
                    <input type="number" name="threshold" value={threshold} onChange={this.handleThresholdChange.bind(this)} />
                </div>

                <p>Expect prediction to be met at: <span id="predicted-time"></span></p>

                <canvas id="chart" className="ContainerStats-Statistics"></canvas>
            </MainLayout>
        );
    }
}

// State to props binding
const mapStateToProps = (state, ownProps) => ({
    containers: state.swarmTasks,
    containerId: ownProps.params.containerId,
    socketIO: state.socketIO
});

export default connect(
    mapStateToProps
)(ContainerStatsPage);
