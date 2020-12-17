import React, { Component } from 'react';
import Logout from "../components/logout";

export default class Navbar extends Component {

    render() {
        return (
            <nav>
                <div className="logo"></div>
                <Logout />

            </nav>
        );

    }
}