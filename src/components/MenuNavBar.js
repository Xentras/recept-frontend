import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from 'react-router-dom'

class MenuNavBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item header>Our Company</Menu.Item>
        <Menu.Item
          as={NavLink} exact to="/search"
          name="Search"
          content="Sök"
          active={activeItem === "Search"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} exact to="/add"
          name="Add"
          content="Nytt recept"
          active={activeItem === "Add"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default MenuNavBar;
