import React, { useState } from "react";
import { Menu, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal.js";
import CheckLoggedIn from "../../helper/CheckLoggedIn/CheckLoggedIn.js";

function MenuNavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // This function is used when opening the modal
  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  // This function is used when closing the modal
  const closeLoginModal = () => {
    setShowLoginModal(false);
    onClick();
  };

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
      <Menu.Item
        as={NavLink}
        exact
        to="/add"
        name="Add"
        content="Nytt recept"
        onClick={() => onClick()}
      />
      <Menu.Menu position="right">
        <Menu.Item name="login">
          <Button primary onClick={() => openLoginModal()}>
            {isLoggedIn ? "Logga ut" : "Logga in"}
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
