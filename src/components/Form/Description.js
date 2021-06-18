import React from "react";
import CustomPopup from "../Common/CustomPopup/CustomPopup.js";
import CustomField from "../Common/CustomField/CustomField.js"

function Description(props) {
  return (
    <div className="field">
      <label htmlFor="values.description">
        Beskrivning
        <CustomPopup
          content="Här kan man skriva en valfri text om receptet, kanske något man ska tänka på eller hur lång tid det tar att göra."
          position="top center"
        />
      </label>
      <CustomField
        handleBlur={props.handleBlur}
        values={props.values}
        name={`description`}
        placeholder="Beskrivning"
        as="textarea"
        setFieldValue={props.setFieldValue}
        allowSpecialChars={true}
      />
    </div>
  );
}

export default Description;
