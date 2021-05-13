import React from "react";
import { Field } from "formik";

function NewDescription() {
  return (
    <div className="field">
      <label htmlFor="values.description">Beskrivning</label>
      <Field name={`description`} placeholder="Beskrivning" as="textarea" />
    </div>
  );
}

export default NewDescription;
