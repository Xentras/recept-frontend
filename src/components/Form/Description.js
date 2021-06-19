import React from "react";
import CustomPopup from "../Common/CustomPopup/CustomPopup.js";
import { Field } from "formik";

function NewDescription() {
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
    </div>
  );
}

export default NewDescription;
