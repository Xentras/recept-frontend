import React from "react";
import { Popup, Icon } from "semantic-ui-react";

function CustomPopup(props) {
  const content = props.content;
  const position = props.position;

  return (
    <Popup
      trigger={
        <Icon
          name="question circle"
          color="blue"
          size="large"
          style={{ marginLeft: "0.5rem", cursor: "pointer" }}
        />
      }
      on="click"
      content={content}
      position={position}
    />
  );
}

export default CustomPopup;
