import React, { Component } from 'react';
import Logout from "../components/logout";


export default class Index extends Component {

    render() {
        return (
            <div>

                <div>
                    <h1>Hello, this is the dashboard</h1>
                    <Logout />
                </div>

            </div>
        );

    }
}