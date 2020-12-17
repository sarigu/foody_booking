import React from 'react';
import MenuItem from "../components/menuItem"
import Navbar from "../components/NavBar";

export default class Menu extends React.Component {
    constructor() {
        super();
        this.state = { menuItems: [] };
    }

    componentDidMount = async () => {
        try {
            const response = await fetch("http://localhost:8000/menu");
            const data = await response.json();
            this.setState({ menuItems: data.data });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="main">
                    <h1>Menu</h1>
                    {this.state.menuItems && this.state.menuItems.map((item, index) => (
                        <MenuItem key={"item" + index} item={item} />
                    ))}
                </div>
            </div>
        );
    }
}