import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import MainLayout from '../../layouts/main';
import Chart from 'chart.js';

class ContainerStatsPage extends Component {
    constructor() {
        super();
        this.points = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }

    // After render, init the chart
    componentDidUpdate() {
        var ctx = document.getElementById("myChart");

        if (!ctx) {
            return;
        }

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [ '', '', '', '', '', '', '', '', '', '' ],
                datasets: [{
                    label: 'RAM Usage',
                    data: this.points,
                    backgroundColor: "rgba(153,255,51,0.4)"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false
            }
        });

        const stats = this.props.socketIO.stats[this.props.containerId];

        if (!stats) {
            return;
        }
//stats.container_stats.memory.usage | stats.container_stats.cpu.usage.total
        // setInterval(() => {

        this.points.push(stats.container_stats.memory.usage / 1024 / 1024);
        this.points = this.points.splice(1, 10);
        console.log(this.points);
        myChart.data.datasets[0].data = this.points;
        myChart.update();

        // }, 1000);
    }

    render() {
        let task = this.props.containers.filter(c => c.ID == this.props.containerId)[0];

        if (!task) {
            return null;
        }

        return (
            <MainLayout>
                {task.Spec.ContainerSpec.Image}<br />
                {task.Status.State}<br />
                {task.Status.ContainerStatus.ContainerID}<br />
                {task.Spec.ContainerSpec.Args ? task.Spec.ContainerSpec.Args.join(" ") : null}
                <canvas id="myChart" width="200" height="200" style={{height: '200px', width: '200px'}}></canvas>

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
