import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const Line = React.createClass({

  propTypes: {
    path:         React.PropTypes.string.isRequired,
    stroke:       React.PropTypes.string,
    strokeWidth:  React.PropTypes.number
  },

  getDefaultProps() {
    return {
      stroke:       'blue',
      fill:         'none',
      strokeWidth:  3
    };
  },

  render() {
    let { path, stroke, fill, strokeWidth } = this.props;
    return (
      <path
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        />
    );
  }

});

const DataSeries = React.createClass({

  propTypes: {
    colors:             React.PropTypes.func,
    data:               React.PropTypes.object,
    interpolationType:  React.PropTypes.string
  },

  getDefaultProps() {
    return {
      data:               {},
      interpolationType:  'cardinal',
      colors:             d3.scale.category10(),  // V3 syntactic
      xScale:             React.PropTypes.func,
      yScale:             React.PropTypes.func
    };
  },

  render() {
    let { data, colors, xScale, yScale, interpolationType } = this.props;

    let line = d3.svg.line()
      .interpolate(interpolationType)
      .x((d) => { return xScale(d.x); })
      .y((d) => { return yScale(d.y); });

    let lines = data.points.map((series, id) => {
      return (
        <Line
          path={line(series)}
          seriesName={series.name}
          stroke={colors(id)}
          key={id}
          />
      );
    });

    return (
      <g>
        <g>{lines}</g>
      </g>
    );
  }

});

const LineChart = React.createClass({

  propTypes: {
    width:  React.PropTypes.number,
    height: React.PropTypes.number,
    data:   React.PropTypes.object.isRequired
  },

  getDefaultProps(){
    return {
      width:  600,
      height: 300
    }
  },

  render() {
    let { width, height, data} = this.props;

    let xScale = d3.scale.ordinal()
      .domain(data.xValues)
      .rangePoints([0, width]);

    let yScale = d3.scale.linear()
      .range([height, 10])
      .domain([data.yMin, data.yMax]);

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
    [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 },
      { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
    [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 },
      { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
    [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 },
      { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
  ],
  xValues: [0,1,2,3,4,5,6],
  yMin: 0,
  yMax: 30
};


ReactDOM.render(
    <LineChart
      data={data}
      width={600}
      height={300}
    />,
  document.getElementById('app')
);
