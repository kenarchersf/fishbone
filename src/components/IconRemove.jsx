import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Icon
const IconRemove = React.createClass({
 render() {
   return (
     <svg className="remove" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 13H5v-2h14v2z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>
   )
 }
});

// which makes this reusable component for other views
export default IconRemove;
