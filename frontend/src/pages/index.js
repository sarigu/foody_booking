import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Index extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.isAuth === "true" ?
                    <div>
                        <h1>Hello, this is the dashboard</h1>
                    </div>
                    : <Link to="/">Please log in   </Link>}
            </div>
        );

    }
}