import React from "react";
import { Field } from "formik";

function NewSource() { 
    return (
      <div className="field">
        <label htmlFor="values.source">Källa</label>
        <Field name={`source`} placeholder="Källa" type="text" />
      </div>
    );
}

export default NewSource;