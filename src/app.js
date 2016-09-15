import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
    injectTapEventPlugin();
    
    let { width, height, data} = this.props;

    let xScale = d3.scale.linear()
      .domain([0,55])
      .range([0, width]);

    let yScale = d3.scale.linear()
      .domain([0,55])
      .range([0, height]);
   

    return (
      <MuiThemeProvider>
      <svg width={width} height={height}>
        <DataSeries
          xScale={xScale}
          yScale={yScale}
          data={plot(data)}
          //data={data}
          width={width}
          height={height}
          />
       
      </svg>
      </MuiThemeProvider>
    );
  }

});



// let data = { 
//    branches: [
//    { branch: 1, name: "", points: [ { x: 0, y: 25 }, { x: 50, y: 25 }] },
//    { branch: 2, name: "Second cause", points: [ { x: 35, y: 20 }, { x: 40, y: 25 }] },
//    { branch: 3, name: "Third cause", points: [ { x: 35, y: 30 }, { x: 40, y: 25 }] }
//   ]
// };

// let data = {branch: 1, name: "", points: [{ x: 0, y: 25 }, { x: 50, y: 25 }], children: [ 
//    { branch: 2, name: "Second cause", points: [{ x: 35, y: 20 }, { x: 40, y: 25 }], children: [] },
//    { branch: 3, name: "Third cause", points: [{ x: 35, y: 30 }, { x: 40, y: 25 }], children: [] }]
// };

// let data = {branch: 1, name: "", points: [{ x: 0, y: 25 }, { x: 55, y: 25 }], children: [ 
//    { branch: 2, name: "Second cause", points: [{ x: 40, y: 15 }, { x: 50, y: 25 }], children: [
//      { branch: 3, name: "Third cause", points: [{ x: 35, y: 20 }, { x: 45, y: 20 }], children: [] }
//    ] },
//    { branch: 4, name: "Fourth cause", points: [{ x: 40, y: 35 }, { x: 50, y: 25 }], children: [] }]
// };

// Sample Data

// let data = {branch: 1, name: "", points: [], children: [ 
//    { branch: 2, name: "Second cause", points: [], children: [] },
//    { branch: 3, name: "Third cause", points: [], children: [] }]
// };

// Sample Data

let data = {branch: 1, name: "", points: [], children: [ 
   { branch: 2, name: "Second cause", points: [], children: [
     { branch: 3, name: "Third cause", points: [], children: [
       { branch: 20, name: "Third level", points: [], children: [] },
       { branch: 21, name: "Third level2", points: [], children: [] },
       { branch: 22, name: "Third level3", points: [], children: [] }
     ] }
   ] },
   { branch: 4, name: "Fourth cause", points: [], children: [
     { branch: 5, name: "Fifth cause", points: [], children: [] },
     { branch: 6, name: "Sixth cause", points: [], children: [] }
   ] },
   { branch: 7, name: "Seventh cause", points: [], children: [] }, 
   { branch: 8, name: "Eighth cause", points: [], children: [] },
   { branch: 9, name: "Ninth cause", points: [], children: [] },
   { branch: 10, name: "Tenth cause", points: [], children: [] }]
};

function isEven(n) {
   return n % 2 == 0;
};

function level(n) {
   return Math.round((1+n)/2);
};

function sign(a,b) {
   if (a-b<0)
    {return -1}
   else {return 1};
}

function horizLength (branch) {
  return branch.points[1].x-branch.points[0].x;
}

// Assign coordinates to horizontal branches from left to right
function horizBranch(parent,n) {
   var points = [];
     {points.push({x: parent.points[1].x-10-(5*(n+1)), y: parent.points[1].y+((n+1)*5*sign(parent.points[0].y,parent.points[1].y)) },{x: parent.points[1].x-(5*(n+1)), y: parent.points[1].y+((n+1)*5*sign(parent.points[0].y,parent.points[1].y))});}
 return points;
};

// Assign coordinates to diagonal branches from outside to inside
function diagBranch(parent,n) {
   var points = [];
    // Diagonal branches on top, then on bottom
    if (parent.points[0].y<25) 
     {points.push({x: parent.points[1].x-7-(5*(n+1)), y: parent.points[1].y-7},{x: parent.points[1].x-(5*(n+1)), y: parent.points[1].y});}
    else
     {points.push({x: parent.points[1].x-7-(5*(n+1)), y: parent.points[1].y+7},{x: parent.points[1].x-(5*(n+1)), y: parent.points[1].y});}
 return points;
};

function plot (data) {
  data.points.push({ x: 0, y: 25 }, { x: 55, y: 25 });

  // Assign coordinates to Level 1 branches
  for (var i=0; i<data.children.length; i++) {
    // Even diagonal branches on top, odd on bottom
    if (isEven(i)==true)
      {data.children[i].points.push({ x: 50-(7*level(i)), y: 18 }, { x: 57-(7*level(i)), y: 25 });}
    else
      {data.children[i].points.push({ x: 50-(7*level(i)), y: 32 }, { x: 57-(7*level(i)), y: 25 });}
  
  // Assign coordinates to Level 2 branches
    for (var j=0; j<data.children[i].children.length; j++) {
      Array.prototype.push.apply(data.children[i].children[j].points, horizBranch(data.children[i], j));
  
 // If a Level 2 branch is at end of Level 1 branch, extend the Level 1 branch
        if (isEven(i)==true && data.children[i].children[j].points[1].y<=data.children[i].points[0].y)
          {data.children[i].points[0].y-=5;
           data.children[i].points[0].x-=5}
        else if (isEven(i)==false && data.children[i].children[j].points[1].y>=data.children[i].points[0].y)
          {data.children[i].points[0].y+=5;
           data.children[i].points[0].x-=5};

   // Assign coordinates to Level 3 branches
    for (var k=0; k<data.children[i].children[j].children.length; k++) {
      Array.prototype.push.apply(data.children[i].children[j].children[k].points, diagBranch(data.children[i].children[j], k));
  
  // If a Level 3 branch is at end of Level 2 branch, extend the Level 2 branch
        if (isEven(i)==true && data.children[i].children[j].children[k].points[1].x<=data.children[i].children[j].points[0].x)
          {data.children[i].children[j].points[0].x-=5}
          // data.children[i].points[0].x-=5}
        else if (isEven(i)==false && data.children[i].children[j].points[1].y>=data.children[i].points[0].y)
          {data.children[i].points[0].y+=5;
           data.children[i].points[0].x-=5};
    };
  
  };
  };
  // If a Level 1 branch has a child, shift later Level 1 branches to the left
  for (var i=2; i<data.children.length; i++)  {
  if (data.children[i-2].children.length>0) {
      var maxLength=Math.max.apply(Math, data.children[i-2].children.map(horizLength));
      for (var ia=i; ia<data.children.length; ia+=2) {
        data.children[ia].points[0].x-=(maxLength-3);
        data.children[ia].points[1].x-=(maxLength-3);
      }        
    }
  };
  return data;
 };

ReactDOM.render(
    <LineChart
    data={data}
    width={600}
    height={600}
    />,
  document.getElementById('app')
);
