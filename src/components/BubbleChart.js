import React, { Component } from 'react';
import * as d3 from 'd3';

import Circle from './Circle';

export default class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bubbleChartData: this.props.bubbleChartData,
    };
  }

  componentDidMount() {
    this.simulation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bubbleChartData !== this.props.bubbleChartData) {
      this.simulation(this.props.bubbleChartData);
    }
  }

  colors = {
    'Advertising & Marketing': '#f5a800',
    'Business Products & Services': '#d77900',
    'Computer Hardware': '#ff4713',
    Construction: '#f93549',
    'Consumer Products & Services': '#c10230',
    Education: '#f45197',
    Energy: '#cb007b',
    Engineering: '#8b3c45',
    'Environmental Services': '#8f4899',
    'Financial Services': '#236092',
    'Food & Beverage': '#0071ce',
    'Government Services': '#007a8a',
    Health: '#2a7050',
    'Human Resources': '#00953b',
    Insurance: '#bab221',
    'IT Services': '#004750',
    'Logistics & Transportation': '#5b6670',
    Manufacturing: '#867874',
    Media: '#00bbb4',
    'Real Estate': '#d6006d',
    Retail: '#8093dc',
    Security: '#3d4543',
    Software: '#00acd8',
    Telecommunications: '#fb5373',
    'Travel & Hospitality': '#00a887',
  }

  simulation(newBubbleChartData) {
    let { bubbleChartData } = this.state;
    bubbleChartData = newBubbleChartData || bubbleChartData;
    const maxRadius = d3.max(bubbleChartData, d => d.value);
    const minRadius = d3.min(bubbleChartData, d => d.value);
    const radiusScale = d3.scaleSqrt().domain([minRadius, maxRadius]).range([5, 40]);

    this.tick = d3.forceSimulation()
      .nodes(bubbleChartData)
      .force('xTowardsTheCenter', d3.forceX(0).strength(0.01))
      .force('yTowardsTheCenter', d3.forceY(100).strength(0.01))
      .force('collide', d3.forceCollide(d => radiusScale(d.value)))
      .on('tick', () => this.setState({ bubbleChartData }));
  }

  renderBubbleChart() {
    const { bubbleChartData } = this.state;

    const maxRadius = d3.max(bubbleChartData, d => d.value);
    const minRadius = d3.min(bubbleChartData, d => d.value);
    const radiusScale = d3.scaleSqrt().domain([minRadius, maxRadius]).range([5, 40]);

    return bubbleChartData.map(el => (
      <Circle
        key={el.name}
        name={el.name}
        r={radiusScale(el.value)}
        cx={el.x}
        cy={el.y}
        fill={this.colors[el.name]}
        strokeWidth="1px"
        stroke="#000"
        onMouseDown={f => f}
        value={el.value}
      />
    ));
  }

  render() {
    const svgDimensions = { width: window.screen.width / 2, height: window.screen.height / 2 };
    const tooltip = <text fill="#000" fontSize="14" className="bubbleChartTooltip" style={{ visibility: 'hidden' }}>tooltip</text>;
    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <g className="bubbleChartGroup" transform={`translate(${svgDimensions.width / 2},${(svgDimensions.height / 2) - 50})`}>
          {this.renderBubbleChart()}
        </g>

        {tooltip}
      </svg>
    );
  }
}
