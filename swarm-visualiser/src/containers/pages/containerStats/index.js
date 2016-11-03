import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Swarm from '../../../components/Swarm';
import MainLayout from '../../layouts/main';
import Chart from 'chart.js';




class ContainerStatsPage extends Component {
    // After render, init the chart
    componentDidUpdate() {
        var ctx = document.getElementById("myChart");

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [ '', '', '', '', '', '', '', '', '', '' ],
                datasets: [{
                    label: 'RAM Usage',
                    data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    backgroundColor: "rgba(153,255,51,0.4)"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        setInterval(() => {
            myChart.data.datasets[0].data.push(Math.floor(Math.random() * 30));
            myChart.data.datasets[0].data = myChart.data.datasets[0].data.splice(1, 10);
            myChart.update();
        }, 1000);
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
    containerId: ownProps.params.containerId
});

export default connect(
    mapStateToProps
)(ContainerStatsPage);
