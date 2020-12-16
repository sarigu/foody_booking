import React from 'react';
import MenuItem from "../components/menuItem"

export default class MenuRecommendation extends React.Component {
    constructor() {
        super();
        this.state = { item: {} };
    }

    componentDidMount = async () => {
        try {
            const response = await fetch("http://localhost:8000/recommendation");
            const data = await response.json();
            this.setState({ item: data.data[0] });
            console.log(this.state.item);
        } catch (e) {
            console.log(e);
        }
    }

    refreshPage = () => {
        window.location.reload();
    }

    render() {
        return (
            <div>
                <h1>Your surprise menu item</h1>
                <MenuItem item={this.state.item} />
                <button onClick={this.refreshPage}>Get a new surprise</button>
            </div>
        );
    }
}