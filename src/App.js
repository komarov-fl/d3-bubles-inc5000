import React, { Component } from 'react';

import BubbleChart from './components/BubbleChart';

import './App.css';

class App extends Component {
  state = {
    yearData: false,
    states: [],
    state: false,
    revenue: false,
  }

  componentDidMount() {
    fetch('/2018inc.json')
      .then(response => response.json())
      .then((data) => {
        const states = data.reduce((prev, curr) => {
          const state = curr.State;
          if (!state || prev.includes(state)) {
            return prev;
          }

          return [
            ...prev,
            state,
          ];
        }, []);

        this.setState({
          yearData: data,
          states,
          state: states[0],
        });
      });
  }

  getBubbleChartData() {
    const { yearData, state, revenue } = this.state;

    let stateData = yearData.filter(d => d.State === state);

    if (!revenue) {
      stateData = stateData.reduce((prev, curr) => {
        const sector = curr['Edit Approved industry'];

        if (!sector) {
          return prev;
        }

        return {
          ...prev,
          [sector]: prev[sector] ? prev[sector] + 1 : 1,
        };
      }, {});
    } else {
      stateData = stateData.reduce((prev, curr) => {
        const sector = curr['Edit Approved industry'];
        const rev = curr['Verified Revenue Growth Rate 2018'];

        if (!sector || !rev) {
          return prev;
        }

        return {
          ...prev,
          [sector]: prev[sector] ? prev[sector] + rev : rev,
        };
      }, {});
    }

    return Object.keys(stateData).map(key => ({ name: key, value: stateData[key] }));
  }

  handleChangeSelectState = (e) => {
    this.setState({
      state: e.target.value,
    });
  }

  handleChangeSelectRevenue = (e) => {
    this.setState({
      revenue: !!parseInt(e.target.value, 10),
    });
  }

  renderSelectState() {
    const { states } = this.state;

    return (
      <select onChange={this.handleChangeSelectState}>
        {states.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
    );
  }

  renderSelectRevenue() {
    return (
      <select onChange={this.handleChangeSelectRevenue}>
        <option value="0" >Number of Cos</option>
        <option value="1" >Revenue</option>
      </select>
    );
  }

  render() {
    const { yearData } = this.state;

    if (!yearData) {
      return (<div>Loading</div>);
    }

    const bubbleChartData = this.getBubbleChartData();

    return (
      <div className="App">
        {this.renderSelectState()}
        {this.renderSelectRevenue()}
        <div>
          {bubbleChartData && <BubbleChart bubbleChartData={bubbleChartData} />}
        </div>
      </div>
    );
  }
}

export default App;
