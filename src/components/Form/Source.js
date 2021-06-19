import React from "react";
import CustomPopup from "../Common/CustomPopup/CustomPopup.js";
import CustomErrorMessage from "../Common/CustomErrorMessage/CustomErrorMessage.js";
import { Field } from "formik";

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
      <Field name={`source`} placeholder="Källa" type="text" />
      <div>
        <CustomErrorMessage name={`source`} />
      </div>
    </div>
  );
}

export default Source;
