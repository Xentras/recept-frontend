import React, { useState, useContext } from "react";
import { Menu, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import LoginModal from "../Login/LoginModal.js";
import CheckLoggedIn from "../../helper/CheckLoggedIn/CheckLoggedIn.js";
import { store } from "../../helper/Store/Store.js";

function MenuNavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const auth = useContext(store);

  // This function is used when opening the modal
  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  // This function is used when closing the modal
  const closeLoginModal = () => {
    setShowLoginModal(false);
    onClick();
  };

  // This will run everytime the user changes "page" to check if the user is logged in or not
  const onClick = async () => {
    if ((await CheckLoggedIn()) === true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
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
          <Button primary onClick={() => openLoginModal()}>
            {auth.state.loggedIn ? "Logga ut" : "Logga in"}
          </Button>
          {showLoginModal && (
            <LoginModal modal={showLoginModal} onChange={closeLoginModal} />
          )}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default MenuNavBar;
