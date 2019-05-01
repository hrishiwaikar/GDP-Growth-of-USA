import React, { Component } from 'react';
import BarGraph from "./BarGraph";
import axios from 'axios';

class GDPAnalysis extends Component {


    state = {
        data: [],
        svg_height: 500,
        svg_width: 1200
    }

    componentDidMount = async () => {
        let data = await axios.get('/api/graph');

        this.setState({
            data: data.data
        })

    }

    render = () => {
        console.log('IN RENDER OF GDP ', this.state.data);
        return (<div>
            <div>
                <h2>GDP Growth Analysis of USA of last 60 years</h2>
            </div>
            {this.state.data !== null && this.state.data.length !== 0
                ?
                <BarGraph data={this.state.data} svg_height={this.state.svg_height} svg_width={this.state.svg_width} />
                :
                null
            }

        </div>)
    }
}

export default GDPAnalysis;
