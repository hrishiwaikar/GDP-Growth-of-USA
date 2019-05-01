import React, { Component } from 'react';
import MovingBarGraph from "./MovingBarGraph.js";
import axios from 'axios';

class GDPAnalysis extends Component {


    state = {
        data: [],
        full_data: [],
        current_index: 0
    }

    componentDidMount = async () => {
        let data = await axios.get('/api/graph');
        this.setState({
            full_data: data.data
        })

        //After an interval of 0.4 seconds add the next year's data to graph , for slow animation
        var interval = 300;
        let component = this;
        for (var i = 0; i < this.state.full_data.length - 1; i++) {
            setTimeout(function () {
                component.addData();
            }, i * interval)
        }


    }

    /** Adds next object to the array of data that is used to display graph */
    addData = () => {

        if (this.state.current_index < this.state.full_data.length) {

            let data = this.state.data;
            let next_data_item = this.state.full_data[this.state.current_index]
            let updated_data = [...data, next_data_item];
            this.setState({
                data: updated_data,
                current_index: this.state.current_index + 1
            })
        }

    }


    render = () => {
        return (<div>
            <div>
                <h2>Gross Domestic Growth of USA in last 60 years</h2>
            </div>

            {this.state.data !== null && this.state.data.length !== 0
                ?
                <>
                    <div style={{ marginTop: "30px", marginBottom: "20px" }}>
                        <h3>{this.state.full_data[this.state.current_index]['date']}: GDP - ${this.state.full_data[this.state.current_index]['value']}</h3>
                    </div>
                    <svg width="100%" height="500" style={{ textAlign: 'center' }}>
                        <MovingBarGraph data={this.state.data} height={500} width={1200} x={100} y={0} />
                    </svg>
                </>
                :
                null
            }

        </div>)
    }
}

export default GDPAnalysis;
