import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Line from './Line';

const DataSeries = React.createClass({

  propTypes: {
    colors:             React.PropTypes.func,
    data:               React.PropTypes.object,
    interpolationType:  React.PropTypes.string
  },

  getDefaultProps() {
    return {
      data:               {},
      interpolationType:  'linear',
     colors:             d3.scale.category10(),  
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
          //stroke={colors(id)}
          stroke='steelblue'
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

export default DataSeries;
