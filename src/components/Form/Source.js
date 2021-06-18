import React from "react";
import CustomPopup from "../Common/CustomPopup/CustomPopup.js";
import CustomField from "../Common/CustomField/CustomField.js";

function Source(props) {
  return (
    <div className="field">
      <label htmlFor="values.source">
        Källa
        <CustomPopup
          content="Länk till sidan där man ursprungligen hittade receptet, eller kanske vilken bok/tidning."
          position="bottom center"
        />
      </label>
      <CustomField
        handleBlur={props.handleBlur}
        values={props.values}
        name={`source`}
        placeholder="Källa"
        type="text"
        setFieldValue={props.setFieldValue}
        allowSpecialChars={true}
      />
    </div>
  );
}

export default Source;
