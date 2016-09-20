import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Icon
const IconAdd = React.createClass({
    render() {
        return (
            <svg className="add" fill="#000000" viewBox="-100 -100 600 600" width="600" height="600" xmlns="http://www.w3.org/2000/svg">
                <title id="title">Add Icon</title>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        )
    }
});

// which makes this reusable component for other views
export default IconAdd;
