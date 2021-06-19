import React from "react";
import CustomPopup from "../Common/CustomPopup/CustomPopup.js";
import CustomErrorMessage from "../Common/CustomErrorMessage/CustomErrorMessage.js";
import { Field } from "formik";

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
      <Field name={`description`} placeholder="Beskrivning" as="textarea" />
      <div>
        <CustomErrorMessage name={`description`} />
      </div>
    </div>
  );
}

export default Description;
