import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

function MenuNavBar() {
  return (
    <Menu>
      <Menu.Item header>Andreas recept</Menu.Item>
      <Menu.Item as={NavLink} exact to="/" name="Search" content="Sök" />
      <Menu.Item as={NavLink} exact to="/add" name="Add" content="Nytt recept" />
    </Menu>
  );
}

export default MenuNavBar;