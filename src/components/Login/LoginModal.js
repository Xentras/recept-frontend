import React from "react";
import { Button, Modal } from "semantic-ui-react";
import Login from "./Login.js";
import Logout from "./Logout.js";

function LoginModal(props) {
  const open = props.modal;

  // This function will run when the user closes the modal
  // it will tell "MenuNavBar.js" that it is closed
  const closeLoginModal = () => {
    props.onChange(false);
  };

  return (
    <Modal
      onClose={() => closeLoginModal()}
      open={open}
      size="mini"
      closeOnDimmerClick={false}
    >
      <Modal.Header>Logga in</Modal.Header>
      <Modal.Content>
        <div className="ui centered grid">
          <div className="one column row">
            <Login />
          </div>
          <div className="one column row">
            <Logout />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Stäng"
          labelPosition="right"
          icon="close"
          onClick={() => closeLoginModal()}
          negative
        />
      </Modal.Actions>
    </Modal>
  );
}

export default LoginModal;
