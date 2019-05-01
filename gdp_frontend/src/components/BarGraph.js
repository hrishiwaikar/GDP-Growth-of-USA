import React, { Component } from 'react';
import * as d3 from "d3";

class BarGraph extends Component {

    componentDidMount = () => {
        this.renderGraph();
    }

    state = {
        data: []
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.data !== this.props.data) {
            // console.log("data is not same");
            this.setState({
                data: nextProps.data
            })

        }
    }

    renderGraph = () => {
        let data = this.props.data;
        // console.log('IN Draw chart, data ', data);
        let svg_height = this.props.svg_height;
        let svg_width = this.props.svg_width;

        const svg = d3.select(this.refs.gdp_bar_graph)
            .append("svg")
            .attr("width", svg_width)
            .attr("height", svg_height)
            .style("background-color", "lightgray");

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => { return i * 40 })
            .attr("y", (d, i) => { return svg_height - this.getValue(d) })
            .attr("width", 25)
            .attr("height", (d, i) => this.getValue(d))
            .attr("fill", "darkred");

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text((d) => d.date)
            .attr("x", (d, i) => { return i * 40 })
            .attr("y", (d, i) => { return (svg_height - this.getValue(d) - 3) })

    }

    getValue = (d) => {
        if (d.value === null) {
            return 0;
        }

        console.log('D value initially ', d.value);
        let divisor = 100000000000;
        let value = parseInt(d.value) / divisor;

        console.log("now val ", value);
        return value
    }
    render = () => {

        return (
            <div ref="gdp_bar_graph" >
            </div>
        )
    }

}

export default BarGraph;
