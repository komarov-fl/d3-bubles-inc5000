import React, { Component } from 'react';
import * as d3 from 'd3';
/* eslint-disable */
export default class Circle extends Component {
  handleMouseDown = (e) => {
    this.props.onMouseDown(e, this.props.name);
  }

  render() {
    const {
      r, cx, cy, fill, strokeWidth, stroke, name, value
    } = this.props;

    return (
      <circle
        className="bubble"
        r={r}
        cx={cx}
        cy={cy}
        fill={fill}
        strokeWidth={strokeWidth}
        stroke={stroke}
        onMouseDown={this.handleMouseDown}
        onMouseMove={(e) => {
          d3.select('.bubbleChartTooltip')
             .style('visibility', 'visible')
             .text(`${name} (${value})`)
             .attr('x', `${e.nativeEvent.offsetX + 10}px`)
             .attr('y', `${e.nativeEvent.offsetY - 10}px`);
      }}
        onMouseOut={() => {
          d3.select('.bubbleChartTooltip')
              .style('visibility', 'hidden');
      }}
      />
    );
  }
}
