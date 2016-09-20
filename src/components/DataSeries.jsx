import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Line from './Line.jsx';
import TextPath from './TextPath.jsx';
import IconAdd from './IconAdd.jsx';

const DataSeries = React.createClass({

    propTypes: {
        colors: React.PropTypes.func,
        data: React.PropTypes.object,
        interpolationType: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            data: {},
            interpolationType: 'linear',
            colors: d3.scale.category10(),
            xScale: React.PropTypes.func,
            yScale: React.PropTypes.func
        };
    },

    render() {
        let {data, colors, xScale, yScale, interpolationType} = this.props;

        let line = d3.svg.line()
            .interpolate(interpolationType)
            .x((d) => {
                return xScale(d.x);
            })
            .y((d) => {
                return yScale(d.y);
            });

        function rows(data) {
            var branches = [];
            branches.push(data);
            for (var i = 0; i < data.children.length; i++) {
                branches.push(data.children[i]);

                for (var j = 0; j < data.children[i].children.length; j++) {
                    branches.push(data.children[i].children[j])

                    for (var k = 0; k < data.children[i].children[j].children.length; k++) {
                        branches.push(data.children[i].children[j].children[k])

                    }
                    ;
                }
                ;
            }
            ;
            return branches;
        };

        let lines = rows(data).map((series, id) => {
            return (
                <g>
                    <Line
                        path={line(series.points)}
                        seriesName={series.name}
                        id={series.branch}
                        //stroke={colors(id)}
                        stroke='steelblue'
                        key={id}
                    />
                    <TextPath
                        xlinkhref={"#" + series.branch}
                        branchtext={series.name}
                    />
                    <IconAdd/>
                </g>
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
