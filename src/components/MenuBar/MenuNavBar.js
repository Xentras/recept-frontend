import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login.js";
import CheckLoggedIn from "../../helper/CheckLoggedIn/CheckLoggedIn.js";
import { store } from "../../Context/Store.js";

function MenuNavBar() {
  const auth = useContext(store);
  const { dispatch } = auth;

  // This will run everytime the user changes "page" to check if the user is logged in or not
  const onClick = async () => {
    if ((await CheckLoggedIn()) === false) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("givenName");
      sessionStorage.removeItem("accessToken")
      dispatch({ type: "LOGOUT" });
    }
  };

  return (
    <Menu>
      <Menu.Item header>Andreas recept</Menu.Item>
      <Menu.Item
        as={NavLink}
        exact
        to="/"
        name="Search"
        content="Sök"
        onClick={() => onClick()}
      />
      {auth.state.loggedIn && (
        <Menu.Item
          as={NavLink}
          exact
          to="/add"
          name="Add"
          content="Nytt recept"
          onClick={() => onClick()}
        />
      )}
      <Menu.Menu position="right">
        {auth.state.loggedIn && (
          <Menu.Item>Välkommen {sessionStorage.getItem("givenName")}</Menu.Item>
        )}
        <Menu.Item name="login">
          <Login />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default MenuNavBar;
