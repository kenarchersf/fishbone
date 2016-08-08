import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DataSeries from './components/DataSeries';

const LineChart = React.createClass({

  propTypes: {
    width:  React.PropTypes.number,
    height: React.PropTypes.number,
    data:   React.PropTypes.object.isRequired
  },

  getDefaultProps(){
    return {
      width:  600,
      height: 600
    }
  },

  render() {
    let { width, height, data} = this.props;

    let xScale = d3.scale.linear()
      .domain([0,50])
      .range([width, 0]);

    let yScale = d3.scale.linear()
      .domain([0,50])
      .range([0, height]);
   

    return (
      <svg width={width} height={height}>
        <DataSeries
          xScale={xScale}
          yScale={yScale}
          data={data}
          width={width}
          height={height}
          />
      </svg>
    );
  }

});

let data = {
  points: [
    [ { x: 0, y: 25 }, { x: 50, y: 25 }],
    [ { x: 5, y: 25 }, { x: 10, y: 20 }],
    [ { x: 5, y: 25 }, { x: 10, y: 30 }]
   ]
};


ReactDOM.render(
    <LineChart
    data={data}
    width={600}
    height={600}
    />,
  document.getElementById('app')
);
