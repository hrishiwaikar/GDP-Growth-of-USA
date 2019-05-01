import React, { Component } from 'react';
import * as d3 from "d3";
const _ = require('lodash');

class MovingBarGraph extends Component {

    state = {
        wScale: d3
            .scaleBand()
            .domain(d3.range(0, this.props.data.length))
            .range([0, this.props.width]),

        hScale: d3
            .scaleLinear()
            .domain([0, parseInt(_.maxBy(this.props.data, 'value')['value'])])
            .range([0, this.props.height - 20])
    }

    componentDidUpdate = () => {
        const gdp_axis = d3.axisLeft(this.state.hScale).tickFormat(d => { return `${Math.round((parseInt(_.maxBy(this.props.data, 'value')['value']) / 1000000000) - (d / 1000000000))} Billion` });
        d3.select(this.refs.left_axis).call(gdp_axis);

        const years_axis = d3.axisBottom(this.state.wScale).tickFormat((d, i) => { if (i % 2 == 0) { return `${1960 + i}` } });
        d3.select(this.refs.top_axis).call(years_axis);

    }

    // Helps update the wScale and hScale with updated props
    static getDerivedStateFromProps(nextProps, prevState) {
        let { wScale, hScale } = prevState;

        wScale.domain(d3.range(0, nextProps.data.length));
        hScale.domain([0, parseInt(_.maxBy(nextProps.data, 'value')['value'])]);
        // console.log('Max of data ', parseInt(_.maxBy(nextProps.data, 'value')['value']));

        let newState = { ...prevState, wScale, hScale };

        return newState;
    }


    render = () => {
        const { x, y, data, height } = this.props,
            { wScale, hScale } = this.state;
        return (
            <g ref="gref" transform={`translate(${x}, ${y})`}>

                {data.map((d, i) => {
                    return (
                        <rect
                            x={wScale(i)}
                            y={height - 20 - hScale(d.value)}
                            width={wScale.bandwidth()}
                            height={hScale(d.value)}
                            style={{ opacity: "0.7" }}
                        />
                    )
                })}
                <g ref="left_axis" transform={`translate(${0}, ${5})`}>
                </g>
                <g ref="top_axis" transform={`translate(${0}, ${height - 20})`}>
                </g>
            </g>
        )
    }

}

export default MovingBarGraph;
