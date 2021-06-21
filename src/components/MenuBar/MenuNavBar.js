import React, { useContext } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Menu, Dropdown } from "semantic-ui-react";
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
      sessionStorage.removeItem("accessToken");
      dispatch({ type: "LOGOUT" });
    }
  };

  return (
    <div>
      <BrowserView>
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
              <Menu.Item>
                Välkommen {sessionStorage.getItem("givenName")}
              </Menu.Item>
            )}
            <Menu.Item name="login">
              <Login />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </BrowserView>
      <MobileView>
        <Menu>
          <Menu.Item header>Andreas recept</Menu.Item>
          <Dropdown item size="large" icon="bars">
            <Dropdown.Menu>
              <Dropdown.Item
                as={NavLink}
                exact
                to="/"
                name="Search"
                content="Sök"
                onClick={() => onClick()}
              />
              {auth.state.loggedIn && (
                <Dropdown.Item
                  as={NavLink}
                  exact
                  to="/add"
                  name="Add"
                  content="Nytt recept"
                  onClick={() => onClick()}
                />
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position="right">
            {auth.state.loggedIn && (
              <Menu.Item>{sessionStorage.getItem("givenName")}</Menu.Item>
            )}
            <Dropdown item icon="user">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Login />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </MobileView>
    </div>
  );
}

export default MenuNavBar;
